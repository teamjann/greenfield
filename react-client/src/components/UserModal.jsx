import React from 'react';
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, UncontrolledAlert } from 'reactstrap';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      secondPassword: '',
      modalState: this.props.modalClicked,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.swapState = this.swapState.bind(this);

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

  handleChangeSecondPassword(e) {
    this.setState({ secondPassword: e.target.value });
  }

  swapState() {
    if (this.state.modalState === 'Sign Up') {
      this.setState({ modalState: 'Login' });
    } else {
      this.setState({ modalState: 'Sign Up' });
    }
  }

  render() {
    if (this.state.modalState === 'Sign Up') {
      return (
        <div>
          <ModalHeader toggle={this.props.toggleModal}> Sign Up</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="inputEmail" className="mr-1">
                  Email
                </label>
                <input
                  id="inputEmail"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword1" className="mr-1">
                  Password
                </label>
                <input
                  id="inputPassword1"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputPassword2" className="mr-1">
                  Retype Password
                </label>
                <input
                  id="inputPassword2"
                  type="password"
                  value={this.state.secondPassword}
                  onChange={this.handleChangeSecondPassword}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSignup}>
              Sign Up
            </Button>
            <Button color="neutral" onClick={this.swapState}>
              Login instead
            </Button>

            <Button color="secondary" onClick={this.props.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      );
    }

    return (
      <div>
        <ModalHeader toggle={this.props.toggleModal}>Login</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label htmlFor="inputEmail" className="mr-1">
                Email
              </label>
              <input
                id="inputEmail"
                type="email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword1" className="mr-1">
                Password
              </label>
              <input
                id="inputPassword1"
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleLogin}>
            Login
          </Button>
          <Button color="neutral" onClick={this.swapState}>
            Sign Up instead
          </Button>
          <Button color="secondary" onClick={this.props.toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

export default UserModal;
