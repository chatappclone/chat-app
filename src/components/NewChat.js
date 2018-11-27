import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NewChat.scss';

class NewChat extends React.Component {
  render() {
    return (
      <div
        className="user-preview"
        role="button"
        tabIndex={0}
        onClick={() => this.props.getNewChatUser(this.props.user)}
      >
        <div className="user-preview__avatar">
          <img className="user-preview__img" src={this.props.user.avatarURL} alt="avatar" />
        </div>
        <div className="user-preview__preview-info">
          <div className="user-preview__room-name">
            <b className="user-preview__name">{this.props.user.name}</b>
          </div>
          <div className="user-preview__presence">{this.props.user.presence.state}</div>
        </div>

        <div className="user-preview__chevron">
          <i className="zmdi zmdi-chevron-right" />
        </div>
      </div>
    );
  }
}

NewChat.propTypes = {
  user: PropTypes.object.isRequired,
  getNewChatUser: PropTypes.func.isRequired,
};

export default NewChat;
