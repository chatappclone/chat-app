import React from 'react';
import PropTypes from 'prop-types';
import RoomPreview from './RoomPreview';
import '../styles/RoomPreviews.scss';

function RoomPreviews({ rooms, roomMap, receiveHandleCurrentRoom, receiveNewChatView }) {
  return (
    <div>
      <nav className="room-previews__nav">
        <div className="room-previews__edit">Edit</div>
        <div>
          <h4>Chats</h4>
        </div>
        <div className="room-previews__new">
          <i
            className="zmdi zmdi-border-color"
            role="button"
            tabIndex={0}
            onClick={receiveNewChatView}
          />
        </div>
      </nav>
      <div className="room-previews__room-list">
        {rooms.map((room) => (
          <RoomPreview
            key={room.id}
            room={room}
            roomMap={roomMap}
            receiveHandleCurrentRoom={receiveHandleCurrentRoom}
          />
        ))}
      </div>
    </div>
  );
}

RoomPreviews.propTypes = {
  rooms: PropTypes.array.isRequired,
  roomMap: PropTypes.array.isRequired,
  receiveHandleCurrentRoom: PropTypes.func.isRequired,
  receiveNewChatView: PropTypes.func.isRequired,
};

export default RoomPreviews;
