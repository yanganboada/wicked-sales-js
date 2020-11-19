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
      <header>
        <div className='top-bar'><i className="fas fa-shipping-fast"></i><span>Free Shipping US orders $75+</span></div>
        <div className= 'header-main'>
          <h3>YABSHOP</h3>
          <nav>
            <ul>
              <li><a href="#"></a> For Him</li>
              <li><a href="#"></a> For Her</li>
              <li><a href="#"></a> For Kids</li>
              <li><a href="#"></a> Contact</li>
            </ul>
          </nav>
          <div className="cart-icon" onClick={this.handleCartClick}>
            <p> {this.props.cartItemCount === 1
              ? `${this.props.cartItemCount} item`
              : `${this.props.cartItemCount} items`
            }</p>
            <i className="fas fa-shopping-cart fa-lg"></i>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
