import React from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit";
import RoomPreviews from "./RoomPreviews";
import ChatRoom from "./ChatRoom";
import Login from "./Login";
import "../styles/App.scss";

class App extends React.Component {

  constructor() {

    super();

    this.state = {
      currentView: "login",  //login -> previews -> chatRoom
      roomList: [],
      currentRoom: {},
      currentUser: "",
      user: {
        id: "",
        username: ""
      }
    };

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
    this.receiveCreateUser = this.receiveCreateUser.bind(this);
    this.receiveUserLogin = this.receiveUserLogin.bind(this);
    this.loadUserChat = this.loadUserChat.bind(this);
  }

  loadUserChat() {
    const userId = this.state.user.id.toString();
    const chatManager = new ChatManager({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      userId: userId,
      tokenProvider: new TokenProvider({
        url: process.env.CHATKIT_TOKEN_PROVIDER_URL
      })
    });

    chatManager
    .connect()
    .then(currentUser => {
      this.setState({
        currentUser: currentUser
      });
      fetch(`http://localhost:8080/users/${this.state.user.id}/rooms`)
        .then(response => response.json())
        .then(result => {
          if (result.length === 0) {
            currentUser
              .joinRoom({ roomId: 19295262 })
              .then(room => {
                this.setState(
                  {
                    roomList: [room]
                  }
                );
              })
              .catch(err => {
                console.log(`Error joining room ${someRoomID}: ${err}`);
              });
          } else {
            this.setState(
              {
                roomList: result
              }
            );
          }
        });
    })
    .catch(err => {
      console.log("Error on connection", err);
    });
  }

  receiveHandleCurrentRoom(currentRoom) {
    this.setState({
      currentRoom,
      currentView: "chatRoom"
    });
  }

  receiveUserLogin(user) {
    console.log(user);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        this.setState(
          { user: {
              id: data.id,
              username: data.username
            },
            currentView: 'previews'
          },
          () => this.loadUserChat()
        );
      }
    });
  }

  receiveCreateUser(user) {
    fetch("/api/create-user", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        this.setState(
          {
            user: {
              id: data.id,
              username: data.username
            },
            currentView: 'previews'
          },
          () => this.loadUserChat()
        );
      }
    });
  }

  render() {

    return (
      <div className="page">
        {this.state.currentView === 'login' && 
        <Login
          receiveCreateUser={this.receiveCreateUser}
          receiveUserLogin={this.receiveUserLogin} />}
        {this.state.currentView === "previews" && 
        <RoomPreviews
          roomList={this.state.roomList}
          receiveHandleCurrentRoom={this.receiveHandleCurrentRoom} />}
        {this.state.currentView === "chatRoom" && 
        <ChatRoom
          currentUser={this.state.currentUser}
          currentRoom={this.state.currentRoom} />}
      </div>
    );
  }
}

export default App;