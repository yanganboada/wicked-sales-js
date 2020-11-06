import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CartSummaryItem from './cart-summary-item';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartData => this.setState({ cart: cartData }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(result => result.json())
      .then(result => {
        const cartArr = [...this.state.cart];
        cartArr.push(result);
        this.setState({ cart: cartArr });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} toggleView={this.setView}/>
          <ProductList toggleView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} toggleView={this.setView}/>
          <ProductDetails params={this.state.view.params} toggleView={this.setView} addToCart={this.addToCart} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} toggleView={this.setView}/>
          <CartSummary cart={this.state.cart} toggleView={this.setView}/>
        </div>
      );
    }

  }
}

export default App;
