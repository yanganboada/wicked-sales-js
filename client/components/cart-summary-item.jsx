import React from 'react'

class CartSummaryItem extends React.Component {
  constructor (props){
    super(props)
  }

  render(){
    return (
        <div className='row card m-4 p-4'>
          <div className="row justify-content-center m-2 p-2">
            <img className="col-5 card-img-left" src={this.props.item.image} alt={this.props.item.name} />
            <div className="col-7">
              <h4 className="card-title">{this.props.item.name}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{`$${this.props.item.price}.00`}</h6>
              <p className="card-text">{this.props.item.shortDescription}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default CartSummaryItem;
