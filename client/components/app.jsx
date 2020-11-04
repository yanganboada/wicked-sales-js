import React from 'react';
import Header from './header';
import ProductList from './product-list';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <ProductList />
      </div>
    );
  }
}

export default App;
