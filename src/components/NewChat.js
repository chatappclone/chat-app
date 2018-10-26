import React from 'react';
import '../styles/NewChat.scss';

class NewChat extends React.Component {

  constructor() {
    super();
  }

  render(){

    return (

    <div className="user-preview" onClick={() => this.props.getNewChatUser(this.props.user)}>
        <div className="user-preview__avatar">

          <img className="user-preview__img" src={this.props.user.avatarURL} />
        </div>
        <div className="user-preview__preview-info">
            <div className="user-preview__room-name">

              <b className="user-preview__name">{this.props.user.name}</b>
            </div>
            <div className="user-preview__presence">
              {this.props.user.presence.state}
            </div>
        </div>

        <div className="user-preview__chevron">
          <i className="zmdi zmdi-chevron-right" />
        </div>
      </div>
    )
  }
}

export default NewChat;
