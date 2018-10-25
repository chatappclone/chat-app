import React from "react";
import '../styles/Login.scss';

class Login extends React.Component {

  constructor() {

    super();

    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleCreateUsernameChange = this.handleCreateUsernameChange.bind(this);
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);

    this.state = {
        login: {
            username: "",
            password: ""
        },
        createUser: {
            username: "",
            password: ""
        }
    };
  }

  handleLoginUsernameChange(event) {
    this.setState({
        login: {
            username: event.target.value,
            password: this.state.login.password
        }
    });
  }

  handleLoginPasswordChange(event) {
    this.setState({
        login: {
            username: this.state.login.username,
            password: event.target.value
        }
    });
  }

  handleCreateUsernameChange(event) {
    this.setState({
        createUser: {
            username: event.target.value,
            password: this.state.createUser.password
        }
  });
}

  handleCreatePasswordChange(event) {
    this.setState({
        createUser: {
            username: this.state.createUser.username,
            password: event.target.value
        }
    });
  }

  handleLoginSubmit(event) {
      event.preventDefault();
      this.props.receiveUserLogin(this.state.login);
  }

  handleCreateUserSubmit(event) {
    event.preventDefault();
    this.props.receiveCreateUser(this.state.createUser);
  }

  render() {
    return (
      <div className='login'>
        <div className='login__logo'></div>
        <form className='login__existing' onSubmit={this.handleLoginSubmit}>
          <div className='login__existing-title'>Existing users</div>
          <div className='login__existing-username'>
            <label>Username:</label>
            <input onChange={this.handleLoginUsernameChange} />
          </div>
          <div className='login__existing-password'>
            <label>Password:</label>
            <input
              onChange={this.handleLoginPasswordChange}
              type="password"
              minLength="3"
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        <form className='login__new' onSubmit={this.handleCreateUserSubmit}>
          <div className='login__new-title'>New users</div>
          <div className='login__new-username'>
            <label>Username:</label>
            <input onChange={this.handleCreateUsernameChange} />
          </div>
          <div className='login__new-password'>
            <label>Password:</label>
            <input
              onChange={this.handleCreatePasswordChange}
              type="password"
              minLength="3"
              placeholder="3 characters minimum"
            />
          </div>
          <button type="submit">Create user</button>
        </form>
      </div>
    );
  }
}

export default Login;