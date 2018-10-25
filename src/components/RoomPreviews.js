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
          <div className="room-previews__edit">Edit</div>
          <div><h4>Chats</h4></div>
          <div className="room-previews__new"><i className="zmdi zmdi-border-color" /></div>
        </nav>
        <div className="room-previews__room-list">
          {this.props.roomList.map(room => <RoomPreview key={room.id} room={room} receiveHandleCurrentRoom={this.props.receiveHandleCurrentRoom}/>)}
        </div>
      </div>

    )
  }
}

export default RoomPreviews;
