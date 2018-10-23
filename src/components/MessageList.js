import React from 'React';



class MessageList extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.roomMessages.map(message => {
            return (
              <li key={message.id}>
                <p>Current message id: {message.id}</p>
                <p>Current message id: {message.text}</p>
                <p>Current message id: {message.user_id}</p>
                <p>Current message id: {message.created_at}</p>
              </li>
            )
          })}
        </ul>
      </div>

    );
  }
}
export default MessageList
