import React from "react";
import Messages from "./Messages";
import Compose from "./Compose";
import "../styles/ChatRoom.scss";

class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = {
      roomMessages: []
    };

    this.receiveSendMessage = this.receiveSendMessage.bind(this);
  }

  componentDidMount() {
    this.props.connectToChatManager();
    this.props.currentUser
      .subscribeToRoom({
        roomId: this.props.currentRoom.id,
        hooks: {
          onNewMessage: message => {
            if (!isNaN(message.senderId)) {
              this.setState(
                {
                  roomMessages: this.state.roomMessages.concat({
                    userId: message.senderId,
                    text: message.text,
                    createdAt: message.createdAt,
                    id: message.id
                  })
                }
              );
            }}
          }
        })
      .catch(error => {
        console.error("error:", error);
      });
  }

  receiveSendMessage(messageText) {
    this.props.currentUser.sendMessage({
      text: messageText,
      roomId: this.props.currentRoom.id
    });
  }

  render() {
    const roomId = this.props.currentRoom.id;
    const roomMap = this.props.roomMap.filter(item => item.roomId === roomId);
    const otherUser = this.props.currentUser.users.filter(user => user.id === roomMap[0].otherMembers[0].id);
    return (

      <div className="chat">
        <div className="chat-container">
          <div className="user-bar">
            <div className="back" onClick={()=>this.props.goBack()}>
              <i className="zmdi zmdi-arrow-left" />
            </div>
            <div className="avatar">
              <img
                src={roomMap[0].otherMembers[0].avatarURL}
                alt="Avatar"
              />
            </div>
            <div className="name">
              {roomMap.length && 
              <span>{roomMap[0].otherMembers.map(member => member.name).join(', ')}</span>}
              {otherUser.length &&
              <span className="status">{otherUser[0].presence.state}</span>}
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
