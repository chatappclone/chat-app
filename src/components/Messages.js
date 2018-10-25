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
        {this.props.roomMessages.map(message => <Message key={message.id} message={message}/>)}
      </div>
    )
  }
}

export default Messages;