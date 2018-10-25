import React from "react";
import Title from "./Title";
import Messages from "./Messages";
import Compose from "./Compose";
import "../styles/ChatRoom.scss";

class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = {
      roomMessages: [],
      otherUser: {
        userId: "",
        username: "",
        avatar: ""
      }
    };

    this.receiveSendMessage = this.receiveSendMessage.bind(this);
  }

  componentDidMount() {
    this.props.currentUser
      .subscribeToRoom({
        roomId: this.props.currentRoom.id,
        hooks: {
          onNewMessage: message => {
            const userId = this.props.user.id.toString()
            fetch(`/api/users/${message.senderId}`)
              .then(response => response.json())
              .then(data => {
                if (message.senderId !== userId) {

                  this.setState({
                    otherUser: Object.assign(this.state.otherUser, {
                      userId: message.senderId,
                      username: data.username,
                      avatar: data.avatar
                    })
                  });
                }
                this.setState(
                  {
                    roomMessages: this.state.roomMessages.concat({
                      userId: message.senderId,
                      username: data.username,
                      avatar: data.avatar,
                      text: message.text,
                      createdAt: message.createdAt,
                      id: message.id
                    })
                  },
                  () => console.log(this.state.otherUser)
                );
              });
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
            <div className="back">
              <i className="zmdi zmdi-arrow-left" />
            </div>
            <div className="avatar">
              <img
                src={this.state.otherUser.avatar}
                alt="Avatar"
              />
            </div>
            <div className="name">
              <span>{this.state.otherUser.username}</span>
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
