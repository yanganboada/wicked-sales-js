import React from 'react';

class ProductDtails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res });
      })
      .catch(err => console.error(err));
  }

  handleBackClick() {
    this.props.toggleView('catalog', null);
  }

  handleAddClick() {
    this.props.addToCart(this.state.product);
  }

  render() {
    return this.state.product

      ? <div className='container'>
        <div className='row card m-4 p-4'>
          <div className="back-arrow w-100 m-2 cursor text-muted" onClick={this.handleBackClick} > {<i className="fas fa-arrow-left"></i>} Back to catalog</div>
          <div className="row justify-content-center m-2 p-2">
            <img className="col-5 card-img-left" src={this.state.product.image} alt={this.state.product.name} />
            <div className="col-7">
              <h4 className="card-title">{this.state.product.name}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{`$${this.state.product.price}.00`}</h6>
              <p className="card-text">{this.state.product.shortDescription}</p>
              <button className="btn btn-primary" onClick={this.handleAddClick}>Add to Cart</button>
            </div>
          </div>
          <div className="card-text">{this.state.product.longDescription}</div>
        </div>
      </div>
      : null;
  }

}

export default ProductDtails;
