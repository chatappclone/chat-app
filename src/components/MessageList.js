import React from 'React';



class MessageList extends React.Component {

  render() {
    return (
      <p>{this.props.currentRoom.id}</p>
    );
  }
}
export default MessageList
