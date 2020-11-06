import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  handleCartClick() {
    this.props.toggleView('cart', {});
  }

  render() {
    return (
      <header className="row text-white bg-dark py-3 justify-content-center align-items-baseline">
        <h4 className="col-8 m-0" text="$ Wicked Sales">$ Wicked Sales</h4>
        <div className="col-1 cursor d-flex justify-content-around" onClick={this.handleCartClick}>
          <p className="m-0"> {this.props.cartItemCount === 1
            ? `${this.props.cartItemCount} item`
            : `${this.props.cartItemCount} items`
          }</p>
          <i className="fas fa-shopping-cart fa-lg"></i>
        </div>
      </header>
    );
  }
}

export default Header;
