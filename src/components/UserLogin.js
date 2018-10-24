import React from "react";

class UserLogin extends React.Component {
  constructor() {
    super();
    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleCreateUsernameChange = this.handleCreateUsernameChange.bind(
      this
    );
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(
      this
    );
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
  })
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
      this.props.receiveUserLogin(this.state.login)
  }

  handleCreateUserSubmit(event) {
    event.preventDefault();
    this.props.receiveUserLogin(this.state.createUser)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLoginSubmit}>
          <h2>Log in:</h2>
          <label>Username:</label>
          <input onChange={this.handleLoginUsernameChange} />
          <label>Password:</label>
          <input
            onChange={this.handleLoginPasswordChange}
            type="password"
            minLength="3"
          />
          <button type="submit">Log in</button>
        </form>
        <form onSubmit={this.handleCreateUserSubmit}>
          <h2>Create user:</h2>
          <label>Username:</label>
          <input onChange={this.handleCreateUsernameChange} />
          <label>Password:</label>
          <input
            onChange={this.handleCreatePasswordChange}
            type="password"
            minLength="3"
            placeholder="3 characters minimum"
          />
          <button type="submit">Create user</button>
        </form>
      </div>
    );
  }
}

export default UserLogin;
