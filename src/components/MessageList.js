import React from 'React';
import Message from './Message';


class MessageList extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.roomMessages.map(message => {
            return (
              
                <Message key={message.id} message={message} /> 
            
            )
          })}
        </ul>
      </div>
    );
  }
}

export default MessageList;