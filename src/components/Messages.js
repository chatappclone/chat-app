import React from 'react';
import Message from './Message';
import '../styles/Messages.scss';

class Messages extends React.Component {

  constructor() {

    super();

    this.conversationRef = React.createRef();
  }

  componentDidMount() {

    const node = this.conversationRef.current;
    node.scrollTop = node.scrollHeight;

  }

  componentDidUpdate() {

    const node = this.conversationRef.current;
    node.scrollTop = node.scrollHeight;

  }

  render() {
    
    return (
      <div className="conversation-container" ref={this.conversationRef}>
        {this.props.roomMessages
        .filter(message => !isNaN(message.userId))
        .map(message => <Message key={message.id} message={message} currentUser={this.props.currentUser}/>)}
      </div>
    )
  }
}

export default Messages;