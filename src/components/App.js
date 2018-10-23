import React from 'react';
import '../styles/App.scss';
import Preview from './Preview';
import ChatRoom from './ChatRoom';
import { ChatManager, TokenProvider } from '@pusher/chatkit'
// import dotenv from 'dotenv';
// dotenv.config({ silent: true })
//require('dotenv').config();

class App extends React.Component {
  constructor(){
    super()

    this.state = { roomList: [],
                   currentRoom: {}
                 }

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:91abf019-fdaa-421a-be70-86cdf9ce4f2f',
      userId: 'sarah',
      tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/91abf019-fdaa-421a-be70-86cdf9ce4f2f/token' })
    })

    fetch("http://localhost:8080/users/1/rooms")
    .then(response => response.json())
    .then(result => {
      
      this.setState({
        roomList: result
      }, () => console.log('componentDidMount', this.state.roomList))
    })
  }

  receiveHandleCurrentRoom(currentRoom) {
    this.setState ( {
      currentRoom : currentRoom
    }, () => console.log('current room state', this.state.currentRoom) )
  }

  render() {

    return (
      <div className="app">

        <h2>Chat App</h2>

       <div className="app__rooms">
        <ul>
         {this.state.roomList.map( room => {
           return (
             <li key={room.id}>
             <Preview
              room={room}
              receiveHandleCurrentRoom={this.receiveHandleCurrentRoom}
            />
           </li>)
         })}
       </ul>

       </div>

       <div className="app__room">
         <ChatRoom currentRoom={this.state.currentRoom} />
       </div>

      </div>
    );
  }
}

export default App;
