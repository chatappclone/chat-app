import React from "react";

class UserLogin extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <form>
          <h2>Log in:</h2>
          <label>Username:</label>
          <input />
          <label>Password:</label>
          <input type="password" minLength="3" />
        </form>
        <form>
          <h2>Create user:</h2>
          <label>Username:</label>
          <input />
          <label>Password:</label>
          <input
            type="password"
            minLength="3"
            placeholder="3 characters minimum"
          />
        </form>
      </div>
    );
  }
}

export default UserLogin;
