import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import SignupModal from './SignupModal.jsx';
import LoginModal from './LoginModal.jsx';
import App from '../index.jsx';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Categories
                  </DropdownToggle>
                  <DropdownMenu right>
                    {this.props.categories.map(category => (
                      <DropdownItem>{category.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <Route path="/signup" component={SignupModal} />
        <Route path="/login" component={LoginModal} />
      </Router>
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
