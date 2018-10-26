import React from "react";
import '../styles/Login.scss';

class Login extends React.Component {

  constructor() {

    super();

    this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleCreateUsernameChange = this.handleCreateUsernameChange.bind(this);
    this.handleCreatePasswordChange = this.handleCreatePasswordChange.bind(this);
    this.handleCreateAvatarChange = this.handleCreateAvatarChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleSignupView = this.handleSignupView.bind(this);
    this.handleLoginView = this.handleLoginView.bind(this);

    this.state = {
        login: {
            username: "",
            password: ""
        },
        createUser: {
            username: "",
            password: "",
            avatar: ""
        },
        login_view: "login"
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
            password: this.state.createUser.password,
            avatar: this.state.createUser.avatar
        }
  });
}

  handleCreatePasswordChange(event) {
    this.setState({
        createUser: {
            username: this.state.createUser.username,
            password: event.target.value,
            avatar: this.state.createUser.avatar
        }
    });
  }

  handleCreateAvatarChange(event) {
    this.setState({
        createUser: {
            username: this.state.createUser.username,
            password: this.state.createUser.password,
            avatar: event.target.value
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

  handleSignupView(){
    this.setState({
      login_view: "signup"
    })
  }
  handleLoginView(){
    this.setState({
      login_view: "login"
    })
  }

  render() {
    return (
      <div className='login'>
        <div className='login__logo'></div>

        {this.state.login_view === 'login' &&
        <div className="login__box">
          <form className='login__existing' onSubmit={this.handleLoginSubmit}>
            <div className='login__existing-title'><h4>Login</h4></div>
            <div className='login__existing-username'>
              <input onChange={this.handleLoginUsernameChange} placeholder="Username" />
            </div>
            <div className='login__existing-password'>
              <input
                onChange={this.handleLoginPasswordChange}
                type="password"
                minLength="3"
                placeholder="Password"
              />
            </div>
            <button type="submit">Log in</button>
            <div className="login__view-switch"></div>
            <p>No Account?</p><div onClick={this.handleSignupView}>Sign up</div>
          </form>
        </div>
      }


        {this.state.login_view === 'signup' &&
        <div className="login__box">
          <form className='login__new' onSubmit={this.handleCreateUserSubmit}>
            <div className='login__new-title'><h4>Sign up</h4></div>
            <div className='login__new-username'>

              <input onChange={this.handleCreateUsernameChange} placeholder="Username" />
            </div>
            <div className='login__new-password'>
              <input
                onChange={this.handleCreatePasswordChange}
                type="password"
                minLength="3"
                placeholder="Password"
              />
            </div>
            <div className='login__new-avatar'>
              <input
                onChange={this.handleCreateAvatarChange}
                placeholder="Link to avatar"
              />
            </div>
            <button type="submit">Create user</button>
            <p>Already have an account?</p><div onClick={this.handleLoginView}>Sign in</div>
          </form>
        </div>
      }


      </div>
    );
  }
}

export default Login;
