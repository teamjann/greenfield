import React from 'react';

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secondPassword: '',
    };
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {
    if (this.state.password === this.state.secondPassword) {
      this.props.addCurrentUser(this.state);
    } else {
      window.alert('The passwords need to match!');
    }
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
        <button onClick={this.handleSignup}>Sign Up</button>
      </div>
    );
  }
}

export default SignupModal;
