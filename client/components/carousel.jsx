import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      index: 0
    };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.hangleNextClick = this.hangleNextClick.bind(this);
  }

  componentDidMount() {
    this.autoPlay();
  }

  autoPlay() {
    const interval = setInterval(() => {
      const index = this.state.index !== this.props.list.length - 1
        ? this.state.index + 1
        : 0;
      this.setState({ index });
    }, 5000);
    this.setState({ interval });
  }

  handlePreviousClick() {
    const index = this.state.index !== 0 ? this.state.index - 1 : this.props.list.length - 1;
    this.setState({ index });
  }

  hangleNextClick() {
    const index = this.state.index !== this.props.list.length - 1 ? this.state.index + 1 : 0;
    this.setState({ index });
  }

  render() {
    return (
      <div className="carousel">
        <div className="carousel-body">
          <i className="fas fa-chevron-left fa-3x cursor"
            onClick={this.handlePreviousClick}>
          </i>
          {this.props.list.map((poke, index) => {
            return <img
              className={this.state.index !== index ? 'hide' : ''}
              src={poke.imageUrl}
              key={index}
              alt={poke.name} />;
          })}
          <i className="fas fa-chevron-right fa-3x cursor"
            onClick={this.hangleNextClick}>
          </i>
        </div>
        <div className="dots">
          {this.props.list.map((poke, index) => (
            <i className={`${index === this.state.index ? 'fas' : 'far'} fa-circle`}
              onClick={() => this.setState({ index })}
              key={index}></i>))}
        </div>
      </div>
    );
  }

}

export default Carousel;
