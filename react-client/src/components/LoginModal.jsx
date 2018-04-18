import React from 'react';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLogin() {
    return this.props.users.map((user) => {
      if (user.name === this.state.email && user.password === this.state.password) {
        this.props.addCurrentUser({ email: this.state.email, password: this.state.password });
        console.log(this.state.email, ' is logged in!');
        return this.setState({ email: '', password: '' });
      }
    });
    window.alert('Invalid username/password');
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <button>Close</button>
        <form>
          <label>Username</label>
          <input type="email" value={this.state.email} onChange={this.handleChangeEmail} />
          <label>Password</label>
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
        </form>
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}

export default LoginModal;
