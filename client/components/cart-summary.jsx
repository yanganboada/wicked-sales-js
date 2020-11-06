import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    this.props.toggleView('catalog', {});
  }

  totalPriceCount(cart) {
    let total = 0;
    cart.forEach(item => {
      cart.length
        ? total += item.price
        : 0;
    });
    return total;
  }

  render() {
    return (
      <div className="container card my-4 p-4">
        <div className="row p-2">
          <div className="back-arrow w-100 m-2 cursor text-muted" onClick={this.handleBackClick} >
            {<i className="fas fa-arrow-left"></i>} Back to catalog
          </div>
          <h2 className="row m-2 p-2">My Cart</h2>
        </div>
        <div className="row">
          {
            this.props.cart.length
              ? this.props.cart.map((item, index) => <CartSummaryItem key={index} item={item} />)
              : <h4>No items currently in your shopping cart</h4>
          }
        </div>
        <h4 className='row m-2 p-2 justify-content-end'>Grand Total: {`$${this.totalPriceCount(this.props.cart)}.00`}</h4>
      </div>
    );
  }
}

export default CartSummary;
