import React from 'React';

class Preview extends React.Component {

  constructor () {
    super()

  this.handleClick = this.handleClick.bind(this)  ;
  }

handleClick () {
  this.props.receiveHandleCurrentRoom(this.props.room)
}

  render() {

    return (
      <div onClick={this.handleClick}>
        <h4>{this.props.room.name}</h4>
        <p>{this.props.room.updated_at}</p>
      </div>
    )
  }
}
export default Preview
