import React from 'react';
import '../styles/Message.scss';

class Message extends React.Component {

  constructor() {
    super();
  }

  render() {

    const message = this.props.message;

    return (
      <div className='message sent'>
        <div className='message__user'>{message.userId}</div>
        <div className='message__text'>{message.text}</div>
        <div className='message__createdAt'>{message.createdAt}</div>
      </div>
    )
  }
}

export default Message;