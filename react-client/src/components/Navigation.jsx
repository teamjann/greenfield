import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import App from '../index.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
    };
  }

  render() {
    return (
      <Router>
        <nav>
          {/* Work on implementing Home page */}
          {/* <Link to="/">Home</Link> */}
          <a href="http://localhost:3000">Home</a>
          {/* Need to render a new route based on selected category */}
          <select placeholder="select a category">
            {this.props.categories.map(category => <option>{category.name}</option>)}
          </select>
          <button onClick={this.props.handleLoginClick}>
            <Link to="/login"> Log In </Link>
          </button>
          <button onClick={this.props.handleSignupClick}>
            <Link to="/signup">Sign Up</Link>
          </button>
          <button>
            <Link to="/login">Log Out</Link>
          </button>

          <Route path="/signup" component={SignupModal} />
          <Route path="/login" component={LoginModal} />
          {/* <Route exact path="/" component={App} /> */}
        </nav>
      </Router>
    );
  }
}

export default Navigation;
