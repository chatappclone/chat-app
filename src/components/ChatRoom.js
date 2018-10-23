import React from 'React';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

//current_room

class ChatRoom extends React.Component {

  constructor(){
    super();

    this.state = { roomMessages: [] }
  }

  componentDidMount(){
    // we need an array of message object passing
    //in the the currentRoom.id as the parameter
  }

  render() {
    return (
      <div>
        <p>This is a chat room</p>
        <Title currentRoom={this.props.currentRoom} />
        <MessageList currentRoom={this.props.currentRoom} />
        <SendMessageForm />
      </div>
    );
  }
}
export default ChatRoom
