import React from 'React';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

//current_room

class ChatRoom extends React.Component {

  constructor(){
    super();

    this.state = { roomMessages: [] }

    this.receiveSendMessage = this.receiveSendMessage.bind(this);
  }

  componentDidMount(){
    // we need an array of message object passing
    //in the the currentRoom.id as the parameter
    // it then need to be set into this.state.roomMessages
  }

  receiveSendMessage(message) {
    this.setState ( {
      roomMessages : [...this.state.roomMessages].concat(message);
    })
  }

  render() {
    return (
      <div>
        <p>This is a chat room</p>
        <Title currentRoom={this.props.currentRoom} />
        <MessageList currentRoom={this.props.currentRoom} />
        <SendMessageForm receiveSendMessage={this.receiveSendMessage}/>
      </div>
    );
  }
}
export default ChatRoom
