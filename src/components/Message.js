import React from 'react';

class Message extends React.Component {

  constructor() {
    super();
  }

  render() {
    
    const message = this.props.message;

    return (
      <li>
        <div>
          <div>{message.text}</div>
          <div>{message.createdAt}</div>
        </div>
      </li>
    )
  }
}

export default Message;