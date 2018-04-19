import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import App from '../index.jsx';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md bg-info">
        <div className="container">
          <div className="navbar-translate">
            <a className="navbar-brand" href="/">
              Home
            </a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <ul className="navbar-nav">
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.categories.map(category => (
                    <DropdownItem key={category.name}> {category.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <Route path="/signup" component={SignupModal} />
          <Route path="/login" component={LoginModal} />
        </div>
      </nav>
    );
  }
}

export default Navigation;

// <Nav>
//           <ul>
//             <li>
//               <a href="#">Home</a>
//             </li>
//             <li>
//               <select placeholder="select a category">
//                 {this.props.categories.map(category => <option>{category.name}</option>)}
//               </select>
//             </li>
//             <li>
//               <button onClick={this.props.handleLoginClick}>
//                 <Link to="/login"> Log In </Link>
//               </button>
//             </li>
//             <li>
//               <button onClick={this.props.handleSignupClick}>
//                 <Link to="/signup">Sign Up</Link>
//               </button>
//             </li>
//             <li>
//               <button>Log Out</button>
//             </li>
//           </ul>
