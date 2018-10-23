import React from 'React';

import React from 'React';

class SendMessageForm extends React.Component {

  constructor () {
    super()
    this.state = {
      message: ""
    }

    this.handleChange= this.handleChange.bind(this);
  }

  handleSubmit(event) {
  event.preventDefault()
  this.props.receiveSendMessage(this.state.message)
  this.setState({
    message: ''
  })
}

  handleChange(event) {
    this.setState = ( {
    message: event.target.value
  } )
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="send__message__form">
        <input
             onChange={this.handleChange}
             value={this.state.message}
             placeholder= "Type your message here amd press ENTER"
           type="text"
         />
      </form>
    );
  }
}
export default SendMessageForm




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
