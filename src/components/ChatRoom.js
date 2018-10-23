import React from 'React';
import Title from './Title';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

class ChatRoom extends React.Component {

  render() {
    return (
      <div>
        <Title />
        <MessageList />
        <SendMessageForm />
      </div>
    );
  }
}
export default ChatRoom
