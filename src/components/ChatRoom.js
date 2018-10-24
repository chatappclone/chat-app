import React from 'React';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import '../styles/ChatRoom.scss';

//current_room

class ChatRoom extends React.Component {

  constructor() {

    super();

    this.state = { roomMessages: [] };

    this.receiveSendMessage = this.receiveSendMessage.bind(this);
  }

  componentDidMount(){
    this.props.currentUser.subscribeToRoom({
        roomId: this.props.currentRoom.id,
        hooks: {
          onNewMessage: message => {
            console.log(`Received new message: ${message.text}`)
            this.setState({
              roomMessages: this.state.roomMessages.concat({userId: message.senderId, text: message.text, createdAt: message.createdAt, id: message.id})
            })
          }
        }
      })
    .catch(error => {
      console.error("error:", error);
    });
  }

  receiveSendMessage(messageText) {
    console.log('message text', messageText)
    this.props.currentUser.sendMessage({
      text: messageText,
      roomId: this.props.currentRoom.id
    });

  }

  render() {
    return (
      <div>
        <p>This is a chat room</p>
        <Title currentRoom={this.props.currentRoom}/>
        <MessageList
          currentRoom={this.props.currentRoom}
          roomMessages={this.state.roomMessages}/>
        <SendMessageForm receiveSendMessage={this.receiveSendMessage}/>
      </div>
    );
  }
}

export default ChatRoom;
