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
        {this.props.otherUsers.map(user => <NewChat key={user.id} user={user} getNewChatUser={this.props.getNewChatUser}/>)}
      </div>
    )
  }
}

export default NewChats;