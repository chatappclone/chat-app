import React from 'react';
import '../styles/Compose.scss';

class Compose extends React.Component {

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
      <form className="conversation-compose" onSubmit={this.handleSubmit}>
      <div className="emoji">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209"><path fillRule="evenodd" clipRule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489"/></svg>
      </div>
      <input className="input-msg" name="input" placeholder="Type a message" value={this.state.message} autoComplete="off" autoFocus onChange={this.handleChange}></input>
        <div className="photo">
          <i className="zmdi zmdi-camera"></i>
        </div>
        <button className="send" type='submit'>
          <div className="circle">
            <i className="zmdi zmdi-mail-send"></i>
          </div>
        </button>
      </form>
    )
  }
}

export default Compose;