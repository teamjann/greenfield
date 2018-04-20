import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from '../index.jsx';
import UserModal from './UserModal.jsx';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      dropdownOpen: false,
      modal: false,
      modalSelected: '',
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleSignupModal = this.toggleSignupModal.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleSignupModal() {
    this.setState({ modalSelected: 'Sign Up' }, this.toggleModal);
  }

  toggleLoginModal() {
    this.setState({ modalSelected: 'Login' }, this.toggleModal);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const modalDisplay = (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <UserModal
            toggleModal={this.toggleModal}
            addCurrentUser={this.props.addCurrentUser}
            logInUser={this.props.logInUser}
            modalClicked={this.state.modalSelected}
          />
        </Modal>
      </div>
    );

    const logInLogOutNav = this.props.currentUser ? (
      <li className="nav-item">
        <a className="nav-link" onClick={this.props.logOutUser}>
          Logout
        </a>
      </li>
    ) : (
      <li className="nav-item">
        <a className="nav-link" onClick={this.toggleLoginModal}>
          Login
        </a>
      </li>
    );

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
              <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle nav caret>
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.categories.map(category => (
                    <DropdownItem key={category.name}> {category.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {logInLogOutNav}
            </ul>
          </div>
        </div>
        {modalDisplay}
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
