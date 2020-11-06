import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Get product failed with status ' + res.status);
      })
      .then(res => this.setState({ products: res }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container-fluid">
        <main className="row justify-content-center m-2">
          {
            this.state.products.map((product, index) => {
              return <ProductListItem item={product} key={index} toggleView={this.props.toggleView} />;
            })
          }
        </main>
      </div>
    );
  }
}

export default ProductList;
