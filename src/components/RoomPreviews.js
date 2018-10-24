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
        {this.props.roomList.map(room => <RoomPreview key={room.id} room={room} receiveHandleCurrentRoom={this.props.receiveHandleCurrentRoom}/>)}
      </div>
    )
  }
}

export default RoomPreviews;