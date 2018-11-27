import React from 'react';
import PropTypes from 'prop-types';
import NewChat from './NewChat';
import '../styles/NewChats.scss';

function NewChats({ otherUsers, getNewChatUser, receiveRoomPreviewsView }) {
  return (
    <div>
      <nav className="user-previews__nav">
        <div className="user-previews__edit" />
        <div>
          <h4>New Chat</h4>
        </div>
        <div
          className="user-previews__new"
          role="button"
          tabIndex={0}
          onClick={receiveRoomPreviewsView}
        >
          Cancel
        </div>
      </nav>
      {otherUsers.map((user) => (
        <NewChat key={user.id} user={user} getNewChatUser={getNewChatUser} />
      ))}
    </div>
  );
}

NewChats.propTypes = {
  otherUsers: PropTypes.array.isRequired,
  getNewChatUser: PropTypes.func.isRequired,
  receiveRoomPreviewsView: PropTypes.func.isRequired,
};

export default NewChats;
