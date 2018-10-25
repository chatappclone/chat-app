import React from "react";
import Title from "./Title";
import Messages from "./Messages";
import Compose from "./Compose";
import "../styles/ChatRoom.scss";

class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = { roomMessages: [] };

    this.receiveSendMessage = this.receiveSendMessage.bind(this);
  }


  componentDidMount() {
    this.props.currentUser
      .subscribeToRoom({
        roomId: this.props.currentRoom.id,
        hooks: {
          onNewMessage: message => {
            fetch(`/api/users/${message.senderId}`)
            .then(response => response.json())
            .then(data => {
              this.setState({
                roomMessages: this.state.roomMessages.concat({
                  userId: message.senderId,
                  username: data.username,
                  avatar: data.avatar,
                  text: message.text,
                  createdAt: message.createdAt,
                  id: message.id
                })
              });
            })
          }
        }
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  receiveSendMessage(messageText) {
    console.log("message text", messageText);
    this.props.currentUser.sendMessage({
      text: messageText,
      roomId: this.props.currentRoom.id
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="chat-container">
          <div className="user-bar">
            <div className="back" onClick={()=>this.props.goBack()}>
              <i className="zmdi zmdi-arrow-left" />
            </div>
            <div className="avatar">
              <img
                src="https://avatars2.githubusercontent.com/u/398893?s=128"
                alt="Avatar"
              />
            </div>
            <div className="name">
              <span>Yetkin Ergun</span>
              <span className="status">online</span>
            </div>
            <div className="actions more">
              <i className="zmdi zmdi-more-vert" />
            </div>
            <div className="actions attachment">
              <i className="zmdi zmdi-attachment-alt" />
            </div>
            <div className="actions">
              <i className="zmdi zmdi-phone" />
            </div>
          </div>
          <div className="conversation">
            <Messages
              user={this.props.user}
              currentRoom={this.props.currentRoom}
              roomMessages={this.state.roomMessages}
            />
            <Compose receiveSendMessage={this.receiveSendMessage} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
