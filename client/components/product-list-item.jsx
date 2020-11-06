import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    this.props.toggleView('details', this.props.item);
  }

  render() {
    return (
      <div className="card col-3 m-2 p-0 card-height cursor" onClick={this.handleItemClick}>
        <img className="card-img-top h-50" src={this.props.item.image} alt={this.props.item.name} />
        <div className="card-body">
          <h4 className="card-title">{this.props.item.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{`$${this.props.item.price}.00`}</h6>
          <p className="card-text">{this.props.item.shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
