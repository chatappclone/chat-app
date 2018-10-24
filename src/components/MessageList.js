import React from 'react';
import Message from './Message';

class MessageList extends React.Component {

  render() {
    return (
      <div>
        {this.props.roomMessages.map(message => <Message key={message.id} message={message}/>)}
      </div>
    )
  }
}

export default MessageList;