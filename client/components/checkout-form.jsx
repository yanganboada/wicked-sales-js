import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  handleBackClick() {
    this.props.toggleView('catalog', {});
  }

  handleInputChange(e) {
    const newState = {}
    const inputName = e.target.name;
    const inputVal = e.target.value;
    newState[inputName] = inputVal
    this.setState(newState);
  }

  handlePlaceOrder() {
    event.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: '' });
    this.handleBackClick();
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
      <div className="container card my-4">
        <div className="row p-2">
          <h2 className="row m-2 p-2">My Cart</h2>
          <h4 className="col-12 text-muted">
            Grand Total: {`$${this.totalPriceCount(this.props.cart)}.00`}
          </h4>
        </div>
        <div>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                maxLength="30"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="creditCard">Credit Card</label>
              <input
                name="creditCard"
                type="number"
                className="form-control"
                value={this.state.creditCard}
                onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address</label>
              <textarea
                name="shippingAddress"
                className="form-control"
                rows="4"
                value={this.state.shippingAddress}
                onChange={this.handleInputChange}>
              </textarea>
            </div>
              <div className="row justify-content-between p-4">
                <div className="text-muted cursor" onClick={this.handleBackClick}>
                  {<i className="fas fa-arrow-left"></i>} Keep Shopping
                </div>
                <button
                  className="btn btn-primary p-2 col-2 cursor" onClick={this.handlePlaceOrder}>
                  Place Order
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
