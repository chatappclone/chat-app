import React from 'react';
import PropTypes from 'prop-types';
import NewChat from './NewChat';
import '../styles/NewChats.scss';

class NewChats extends React.Component {
  constructor() {
    super();

    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleCancelClick() {
    this.props.receiveRoomPreviewsView();
  }

  render() {
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
            onClick={this.handleCancelClick}
          >
            Cancel
          </div>
        </nav>
        {this.props.otherUsers.map((user) => (
          <NewChat key={user.id} user={user} getNewChatUser={this.props.getNewChatUser} />
        ))}
      </div>
    );
  }
}

NewChats.propTypes = {
  otherUsers: PropTypes.array.isRequired,
  getNewChatUser: PropTypes.func.isRequired,
  receiveRoomPreviewsView: PropTypes.func.isRequired,
};

export default NewChats;
