import React from 'react';
import '../styles/RoomPreview.scss';

class RoomPreview extends React.Component {

  constructor () {

    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.receiveHandleCurrentRoom(this.props.room);
  }

  render() {

    const roomUpdatedAt = this.props.room.updated_at


    return (
        <div className="room-preview" onClick={this.handleClick}>
          <div>
            <img className="room-preview__img" src="https://secure.gravatar.com/avatar/0ba92bd0375beca9c95f958e7a331219" />
          </div>
          <div className="room-preview__preview-info">
            <div className="room-preview__room-details">
              <div className="room-preview__name">
                <b>{this.props.room.name}</b>
                <p>{roomUpdatedAt}</p>
              </div>
              <div>
                <p>preview</p>
              </div>
            </div>
            <div>
              <p>chev</p>
            </div>
          </div>

        </div>
    )
  }
}

export default RoomPreview;
