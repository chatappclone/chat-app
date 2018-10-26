import React from 'react';
import RoomPreview from './RoomPreview';
import '../styles/RoomPreviews.scss';

function RoomPreviews({rooms, roomMap, receiveHandleCurrentRoom}) {

  return (
    <div>
      <nav className="room-previews__nav">
        <div className="room-previews__edit">Edit</div>
        <div><h4>Chats</h4></div>
        <div className="room-previews__new"><i className="zmdi zmdi-border-color" /></div>
      </nav>
      <div className="room-previews__room-list">
        {rooms.map(room => <RoomPreview key={room.id} room={room} roomMap={roomMap} receiveHandleCurrentRoom={receiveHandleCurrentRoom}/>)}
      </div>
    </div>
  )
}

export default RoomPreviews;
