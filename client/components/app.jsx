import React from 'react';
import Header from './header';
import Carousel from './carousel';
import PromotionalGrid from './promotional-grid';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CartSummaryItem from './cart-summary-item';
import CheckoutForm from './checkout-form';

const banner = [
  {
    id: '001',
    name: 'Bulbasaur',
    imageUrl: 'https://images.ctfassets.net/p3w8f4svwgcg/5foJvEf5EAAaUMuqK0qge/653604e5c33d41d54ae05ccad1dccb12/phase1-silo.png'
  },
  {
    id: '004',
    name: 'Charmander',
    imageUrl: 'https://cdn.shopify.com/s/files/1/2997/6356/products/2StacC-G_v4_cc3cf864-2b5b-4da7-8091-5c83f761157b_1000x.jpg?v=1602753432'
  },
  {
    id: '006',
    name: 'Charizard',
    imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/S_YfNCUKAgITM_Dpwc-BnDj7V7w/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/08/26/841/n/1922794/9adfa86c5d642ee1244973.36618183_/i/Project-62-Astrology-Candle-Collection-Target.jpg'
  }
];

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
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(orderInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderInfo)
    })
      .then(() => {
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} toggleView={this.setView}/>
          <Carousel list={banner} />
          <PromotionalGrid toggleView={this.setView}/>
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
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} toggleView={this.setView} />
          <CheckoutForm cart={this.state.cart} toggleView={this.setView} placeOrder={this.placeOrder} />
        </div>
      );
    }
  }
}

export default App;
