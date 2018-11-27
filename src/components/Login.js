import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.scss';

class Login extends React.Component {
  constructor() {
    super();

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleSignupView = this.handleSignupView.bind(this);
    this.handleLoginView = this.handleLoginView.bind(this);

    this.state = {
      login: {
        username: '',
        password: '',
      },
      createUser: {
        username: '',
        password: '',
        avatar: '',
      },
      login_view: 'login',
    };
  }

  handleLoginUsernameChange(username) {
    this.setState((prevState) => ({
      login: {
        username,
        password: prevState.login.password,
      },
    }));
  }

  handleLoginPasswordChange(password) {
    this.setState((prevState) => ({
      login: {
        username: prevState.login.username,
        password,
      },
    }));
  }

  handleCreateUsernameChange(username) {
    this.setState((prevState) => ({
      createUser: {
        username,
        password: prevState.createUser.password,
        avatar: prevState.createUser.avatar,
      },
    }));
  }

  handleCreatePasswordChange(password) {
    this.setState((prevState) => ({
      createUser: {
        username: prevState.createUser.username,
        password,
        avatar: prevState.createUser.avatar,
      },
    }));
  }

  handleCreateAvatarChange(avatar) {
    this.setState((prevState) => ({
      createUser: {
        username: prevState.createUser.username,
        password: prevState.createUser.password,
        avatar,
      },
    }));
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.receiveUserLogin(this.state.login);
  }

  handleCreateUserSubmit(event) {
    event.preventDefault();
    this.props.receiveCreateUser(this.state.createUser);
  }

  handleSignupView() {
    this.setState({
      login_view: 'signup',
    });
  }

  handleLoginView() {
    this.setState({
      login_view: 'login',
    });
  }

  render() {
    return (
      <div className="login">
        <div className="login__logo" />

        {this.state.login_view === 'login' && (
          <div className="login__box">
            <form className="login__existing" onSubmit={this.handleLoginSubmit}>
              <div className="login__username">
                <input
                  className="login__input"
                  onChange={(event) => this.handleLoginUsernameChange(event.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="login__password">
                <input
                  className="login__input"
                  onChange={(event) => this.handleLoginPasswordChange(event.target.value)}
                  type="password"
                  minLength="3"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="login__button">
                Log in
              </button>
              <div className="login__view-switch">
                <p>No Account?</p>
                <div
                  className="login__switch"
                  role="button"
                  tabIndex={0}
                  onClick={this.handleSignupView}
                >
                  Sign up
                </div>
              </div>
            </form>
          </div>
        )}

        {this.state.login_view === 'signup' && (
          <div className="login__box">
            <form className="login__new" onSubmit={this.handleCreateUserSubmit}>
              <div className="login__username">
                <input
                  className="login__input"
                  onChange={(event) => this.handleCreateUsernameChange(event.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="login__password">
                <input
                  className="login__input"
                  onChange={(event) => this.handleCreatePasswordChange(event.target.value)}
                  type="password"
                  minLength="3"
                  placeholder="Password"
                />
              </div>
              <div className="login__avatar">
                <input
                  className="login__input"
                  onChange={(event) => this.handleCreateAvatarChange(event.target.value)}
                  placeholder="Link to avatar"
                />
              </div>
              <button type="submit" className="login__button">
                Create user
              </button>
              <div className="login__view-switch">
                <p>Already have an account?</p>
                <div
                  className="login__switch"
                  role="button"
                  tabIndex={0}
                  onClick={this.handleLoginView}
                >
                  Sign in
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  receiveUserLogin: PropTypes.func.isRequired,
  receiveCreateUser: PropTypes.func.isRequired,
};

export default Login;
