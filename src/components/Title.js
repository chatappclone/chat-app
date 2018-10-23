import React from 'React';

class Title extends React.Component {

  render() {
    return (
      <h3>{this.props.currentRoom.name}</h3>
    );
  }
}
export default Title
