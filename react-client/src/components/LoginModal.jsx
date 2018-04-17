import React from 'react';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <button>Close</button>
        <form>
          <label>Username</label>
          <input type="email" />
          <label>Password</label>
          <input type="password" />
        </form>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    );
  }
}

export default LoginModal;
