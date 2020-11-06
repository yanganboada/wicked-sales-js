import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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
    return this.state.view.name === 'catalog'
      ? <div>
        <Header cartItemCount={this.state.cart.length}/>
        <ProductList toggleView={this.setView}/>
      </div>
      : <div>
        <Header cartItemCount={this.state.cart.length}/>
        <ProductDetails params={this.state.view.params} toggleView={this.setView} addToCart={this.addToCart}/>
      </div>;
  }
}

export default App;
