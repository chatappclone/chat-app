import React from 'react';
import PropTypes from 'prop-types';
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
          .filter((message) => !Number.isNaN(message.userId))
          .map((message) => (
            <Message key={message.id} message={message} user={this.props.user} />
          ))}
      </div>
    );
  }
}

Messages.propTypes = {
  roomMessages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

export default Messages;
