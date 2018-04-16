import React from 'react';

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secondPassword: '',
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
          <label>Retype Password</label>
          <input type="password" />
        </form>
        <button>Sign Up</button>
      </div>
    );
  }
}

export default SignupModal;
