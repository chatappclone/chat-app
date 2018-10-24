import React from 'react';
import '../styles/SendMessageForm.scss';

class SendMessageForm extends React.Component {

  constructor () {

    super();

    this.state = {
      message: ""
    };

    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.receiveSendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (
      <div className='message-input'>
        <form
          onSubmit={this.handleSubmit}
          className="send__message__form">
          <input
            onChange={this.handleChange}
            placeholder= "Type message"
            type="text"></input>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

export default SendMessageForm;




// class SendMessageForm extends React.Component {
//
//   render() {
//     return (
//       <form>
//         <input type="search" placeholder="Type Message" />
//         <button type="submit">Send</button>
//       </form>
//     );
//   }
// }
// export default SendMessageForm
