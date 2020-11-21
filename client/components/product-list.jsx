import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filterOn: false
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


  filter(e) {
    this.setState({
      filterOn: true
    });
    let target;
    if (event.target.tagName === 'DIV') {
      target = event.target;
    } else if (event.target.tagName === 'FIGURE') {
      target = event.target.parentElement;
    } else {
      target = event.target.parentElement.parentElement;
    }

    const filterClass = target.className.slice(7);
    const card = document.querySelectorAll('.column');

    for (let i = 0; i < this.state.products.length; i++) {
      card[i].classList.add('d-none');
      if (filterClass === 'all') {
        this.setState({
          filterOn: false
        });
        card[i].classList.remove('d-none');
      }
      if (this.state.products[i].name.toLowerCase().indexOf(filterClass) > -1) {
        card[i].classList.remove('d-none');
      }
    }
    e.stopPropagation();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className='product-list-header'>
          <img src="./images/favicon.png" alt="favicon"/>
          <h1>Our Products</h1>
        </div>
        <div className="filter justify-content-center mt-5">
          <div className="filter-all" onClick={this.filter}>
            <figure>
              <img src="./images/nav-icon/all-dk.png" onMouseOver={e => (e.currentTarget.src = './images/nav-icon/all-lt.png')} onMouseOut={e => (e.currentTarget.src = './images/nav-icon/all-dk.png')} alt="All" />
              <figcaption onMouseOver={e => (e.currentTarget.previousSibling.src = './images/nav-icon/all-lt.png')} onMouseOut={e => (e.currentTarget.previousSibling.src = './images/nav-icon/all-dk.png')}>
                All
              </figcaption>
            </figure>
          </div>
          <div className="filter-invitation" onClick={this.filter}>
            <figure>
              <img src="./images/nav-icon/living-room-dk.png" onMouseOver={e => (e.currentTarget.src = './images/nav-icon/living-room-lt.png')} onMouseOut={e => (e.currentTarget.src = './images/nav-icon/living-room-dk.png')} alt="living room" />
              <figcaption onMouseOver={e => (e.currentTarget.previousSibling.src = './images/nav-icon/living-room-dk.png')} onMouseOut={e => (e.currentTarget.previousSibling.src = './images/nav-icon/living-room-lt.png')}>Living Room</figcaption>
            </figure>
          </div>
          <div className="filter-menu" onClick={this.filter}>
            <figure>
              <img src="./images/nav-icon/bedroom-dk.png" onMouseOver={e => (e.currentTarget.src = './images/nav-icon/bedroom-lt.png')} onMouseOut={e => (e.currentTarget.src = './images/nav-icon/bedroom-dk.png')} alt="Menu" />
              <figcaption onMouseOver={e => (e.currentTarget.previousSibling.src = './images/nav-icon/bedroom-lt.png')} onMouseOut={e => (e.currentTarget.previousSibling.src = './images/nav-icon/bedroom-dk.png')}>
                Bedroom
              </figcaption>
            </figure>
          </div>
          <div className="filter-numbers" onClick={this.filter}>
            <figure>
              <img src="./images/nav-icon/home-office-dk.png" onMouseOver={e => (e.currentTarget.src = './images/nav-icon/home-office-lt.png')} onMouseOut={e => (e.currentTarget.src = './images/nav-icon/home-office-dk.png')} alt="Numbers" />
              <figcaption onMouseOver={e => (e.currentTarget.previousSibling.src = './images/nav-icon/home-office-lt.png')} onMouseOut={e => (e.currentTarget.previousSibling.src = './images/nav-icon/home-office-dk.png')} >
                Home Office
              </figcaption>
            </figure>
          </div>
        </div>
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
