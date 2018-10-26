import React from 'react';
import NewChat from './NewChat';
import '../styles/NewChats.scss';

class NewChats extends React.Component {

  constructor() {
    super();

  }

  render(){
    return(
      <div>
        <nav className="user-previews__nav">
          <div className="user-previews__edit">Edit</div>
          <div><h4>New Chat</h4></div>
          <div className="user-previews__new">Cancel</div>
        </nav>
        {this.props.otherUsers.map(user => <NewChat key={user.id} user={user} getNewChatUser={this.props.getNewChatUser}/>)}
      </div>
    )
  }
}

export default NewChats;
