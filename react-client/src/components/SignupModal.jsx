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
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeSecondPassword = this.handleChangeSecondPassword.bind(this);
  }

  handleSignup() {
    if (this.state.password === this.state.secondPassword) {
      this.props.addCurrentUser({ email: this.state.email, password: this.state.password });
      this.setState({
        email: '',
        password: '',
        secondPassword: '',
      });
    } else {
      window.alert('The passwords need to match!');
    }
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleChangeSecondPassword(e) {
    this.setState({ secondPassword: e.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="inputEmail">Username</label>
            <input
              id="inputEmail"
              type="email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword1">Password</label>
            <input
              id="inputPassword1"
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Retype Password</label>
            <input
              id="inputPassword2"
              type="password"
              value={this.state.secondPassword}
              onChange={this.handleChangeSecondPassword}
            />
          </div>
        </form>
        {/* Implement signup router functionality */}
        <button onClick={this.handleSignup}>Sign Up</button>
      </div>
    );
  }
}

export default SignupModal;
