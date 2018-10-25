import React from 'react';
import RoomPreview from './RoomPreview';
import '../styles/RoomPreviews.scss';

class RoomPreviews extends React.Component {

  constructor() {

    super();

  }

  render() {

    return (
      <div>
        <nav className="room-previews__nav">
          <div><p>Edit</p></div>
          <div><h3>Chat</h3></div>
          <div><p>New</p></div>
        </nav>
        <div className="room-previews__room-list">
          {this.props.roomList.map(room => <RoomPreview key={room.id} room={room} receiveHandleCurrentRoom={this.props.receiveHandleCurrentRoom}/>)}
        </div>
      </div>

    )
  }
}

export default RoomPreviews;
