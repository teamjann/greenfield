import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
    };
  }

  render() {
    return (
      <nav>
        <a href="#">Home</a>
        <select placeholder="select a catergory">
          {this.props.categories.map(category => <option>{category.name}</option>)}
        </select>
        <button>Sign In</button>
        <button onClick={this.props.handleSignupClick}>Sign Up</button>
        <button>Log Out</button>
      </nav>
    );
  }
}

export default Navigation;
