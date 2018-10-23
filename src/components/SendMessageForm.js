import React from 'React';

class SendMessageForm extends React.Component {

  render() {
    return (
      <form>
        <input type="search" placeholder="Type Message" />
        <button type="submit">Send</button>
      </form>
    );
  }
}
export default SendMessageForm
