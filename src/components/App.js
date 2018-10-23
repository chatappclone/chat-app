import React from 'react';
import '../styles/App.scss';
import Preview from './Preview';
import ChatRoom from './ChatRoom';

class App extends React.Component {
  constructor(){
    super()

    this.state = { roomList: [],
                   currentRoom: {}
                 }

    this.receiveHandleCurrentRoom = this.receiveHandleCurrentRoom.bind(this);
  }

  componentDidMount(){
    fetch("/api/rooms")
    .then(response => response.json())
    .then(result => {
      const roomsArray = Object.values(result.rooms)
      this.setState({
        roomList: roomsArray
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
         <ChatRoom />
       </div>

      </div>
    );
  }
}

export default App;
