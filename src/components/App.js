import React from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import Preview from './Preview';
import ChatRoom from './ChatRoom';
import '../styles/App.scss';

class App extends React.Component {

  constructor() {

    super();

    this.state = { roomList: [],
                   currentRoom: {},
                   currentUser: "",
                   currentView: "previews"
                 };

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
  }

  componentDidMount() {

    const chatManager = new ChatManager({
      instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
      userId: '1',
      tokenProvider: new TokenProvider({ url: process.env.CHATKIT_TOKEN_PROVIDER_URL })
    });

    chatManager.connect()
    .then(currentUser => {
      this.setState({
        currentUser: currentUser
      });
      console.log('Successful connection', currentUser.id);
    })
    .catch(err => {
      console.log('Error on connection', err);
    });

    fetch("http://localhost:8080/users/1/rooms")
    .then(response => response.json())
    .then(result => {
      this.setState({
        roomList: result
      }, () => console.log('componentDidMount', this.state.roomList));
    });
  }

  receiveHandleCurrentRoom(currentRoom) {
    this.setState ({
      currentRoom,
      currentView: "chatRoom"
    });
  }

  render() {

    return (
      <div className="app">
        <h2>Chat App</h2>
        <div className="app__rooms">
          <ul>
            {this.state.roomList.map( room => {
              return (
                (this.state.currentView === 'previews') &&
                <li key={room.id}>
                  <Preview
                    room={room}
                    receiveHandleCurrentRoom={this.receiveHandleCurrentRoom} />
                 </li>)
            })}
        </ul>
       </div>
       <div className="app__room">
         {(this.state.currentView === 'chatRoom') && <ChatRoom currentUser={this.state.currentUser} currentRoom={this.state.currentRoom} />}
       </div>
      </div>
    )
  }
}

export default App;