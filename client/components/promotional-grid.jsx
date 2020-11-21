import React from 'react';

class PromotionalGrid extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='promotion'>
        <div className='promo-left'>
          <img src="https://i.etsystatic.com/issc/35cd5d/40433347/issc_680x540.40433347_kmhslb9w.jpg?version=0"
               alt=""
               onClick={() => this.props.toggleView('catalog', null)}/>
        </div>
        <div className='promo-right'>
          <img src="https://i.etsystatic.com/15049114/c/2421/1924/0/82/il/1fc31b/1922343080/il_340x270.1922343080_9x6v.jpg"
               alt=""
               onClick={() => this.props.toggleView('catalog', null)}/>
          <img src="https://i.etsystatic.com/15049114/d/il/5c7359/2112119229/il_340x270.2112119229_es1n.jpg?version=0"
               alt=""
               onClick={() => this.props.toggleView('catalog', null)}/>
        </div>
      </div>

    )
  }
}

export default PromotionalGrid;
