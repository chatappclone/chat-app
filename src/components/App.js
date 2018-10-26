import React from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit";
import RoomPreviews from "./RoomPreviews";
import ChatRoom from "./ChatRoom";
import Login from "./Login";
import NewChat from "./NewChat";
import "../styles/App.scss";

class App extends React.Component {

  constructor() {

    super();

    this.state = {
      currentAppView: "login",  //login -> previews -> newChat -> chatRoom
      currentUser: {},
      otherUsers: [],
      currentRoom: {},
      availableRooms: [],
      roomMap: [],
      user: {
        id: "",
        username: ""
      }
    };

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
    this.receiveCreateUser = this.receiveCreateUser.bind(this);
    this.receiveUserLogin = this.receiveUserLogin.bind(this);
    this.loadUserChat = this.loadUserChat.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.setState({currentAppView: "previews"});
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
        currentUser: currentUser,
        availableRooms: currentUser.rooms
      });
      return currentUser;
    })
    .then(currentUser => {
      if (this.state.availableRooms.length === 0) {
        currentUser.joinRoom({ roomId: 19371557 });
      }
      return currentUser;
    })
    .then(currentUser => {
      console.log(currentUser);
      this.state.availableRooms.forEach(room => {
        Promise.all(room.userIds.map(userId => fetch(`/api/users/${userId}`)
                                               .then(response => response.json())))
        .then(values => {
          const roomId = room.id;
          const roomMembers = values;
          const otherMembers = roomMembers.filter(member => member.id !== parseInt(currentUser.id,10));
          const roomMap = this.state.roomMap;
          this.setState({otherUsers: otherMembers,
                         roomMap: roomMap.concat([{roomId,roomMembers,otherMembers}])});
        });
      }); 
    });
  }
  
  receiveHandleCurrentRoom(currentRoom) {
    this.setState({
      currentRoom,
      currentAppView: "chatRoom"
    });
  }

  receiveUserLogin(user) {
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
            currentAppView: 'previews'
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
            currentAppView: 'previews'
          },
          () => this.loadUserChat()
        );
      }
    });
  }

  render() {
    console.log(this.state.currentUser);

    return (
      <div className="page">
        {this.state.currentAppView === 'login' &&
        <Login
          receiveCreateUser={this.receiveCreateUser}
          receiveUserLogin={this.receiveUserLogin} />}
        {this.state.currentAppView === "previews" &&
        <RoomPreviews
          roomMap={this.state.roomMap}
          rooms={this.state.availableRooms}
          receiveHandleCurrentRoom={this.receiveHandleCurrentRoom} />}
        {this.state.currentAppView === "newChat" &&
        <NewChat 
          otherUsers={this.state.otherUsers}/>}  
        {this.state.currentAppView === "chatRoom" &&
        <ChatRoom
          roomMap={this.state.roomMap}
          goBack={this.goBack}
          user={this.state.user}
          currentUser={this.state.currentUser}
          currentRoom={this.state.currentRoom} />}
      </div>
    );
  }
}

export default App;