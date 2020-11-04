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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    return this.state.view.name === 'catalog'
      ? <div>
        <Header />
        <ProductList toggleView={this.setView}/>
      </div>
      : <div>
        <Header />
        <ProductDetails params={this.state.view.params} toggleView={this.setView}/>
      </div>;
  }
}

export default App;
