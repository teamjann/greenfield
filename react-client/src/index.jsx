import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation.jsx';
import CategoryView from './components/CategoryView.jsx';
import CourseDetailView from './components/CourseDetailView.jsx';
import LoginModal from './components/LoginModal.jsx';
import SignupModal from './components/SignupModal.jsx';
// probably don't need all of these, will delete some
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
} from 'reactstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourses: [],
      signupModalTriggered: false,
      loginModalTriggered: false,
      currentUser: {},
      categories: [
        {
          _id: 1,
          name: 'React',
          courses: [
            {
              _id: 1,
              name: 'Reactify',
              upvotes: 100,
              description: {
                createdOn: '01.01.2001',
                instructor: 'Nick Fray',
                price: 8,
                videoUrl: 'http://via.placeholder.com/350x150',
                text: 'party',
              },
              courseUrl: 'https://www.udemy.com/understand-javascript/',
            },
          ],
        },
      ],
      users: [
        {
          _id: 1,
          email: 'johncrogers@test.com',
          password: '1234',
          coursesUpvoted: [],
        },
      ],
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidMount() {
    // axios
    //   .get('/api/categories')
    //   .then(res =>
    //     this.setState({
    //       categories: res,
    //     }))
    //   .catch(err => console.log(err));
  }

  addCurrentUser(user) {
    // The order here will need to be switched when validation server-side is working!
    this.setState({ currentUser: user });
    axios
      .post('/api/users', user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  getAllCategories() {
    axios
      .get('/api/categories')
      .then(res =>
        this.setState({
          categories: res,
        }))
      .catch(err => console.log(err));
  }

  handleLoginClick() {
    this.setState({ loginModalTriggered: true, signupModalTriggered: false });
  }

  handleSignupClick() {
    this.setState({ signupModalTriggered: true, loginModalTriggered: false });
  }

  getCoursesforCategory(category) {
    axios
      .get(`/api/categories/${category._id}/courses`)
      .then(res =>
        this.setState({
          currentCourses: res,
        }))
      .catch(err => console.log(err));
  }

  createNewCategory(category) {
    axios
      .post('/api/categories', (newCategory: category))
      .then((res) => {
        this.getAllCategories();
      })
      .catch(err => console.log(err));
  }

  createNewCourse(category, course) {
    axios
      .post(`/api/categories/${category._id}/courses`, (newCourse: course))
      .then((res) => {
        this.getCoursesforCategory(category);
      })
      .catch(err => console.log(err));
  }

  render() {
    // TURN ME ON WHEN WORKING ON MODAL
    // if (this.state.signupModalTriggered) {
    //   return (
    //     <div className="container">
    //       <Nav>
    //         <Navigation
    //           handleSignupClick={this.handleSignupClick}
    //           handleLoginClick={this.handleLoginClick}
    //           categories={this.state.categories}
    //         />
    //         {/* <SignupModal addCurrentUser={this.addCurrentUser} /> */}
    //       </Nav>
    //     </div>
    //   );
    // } else if (this.state.loginModalTriggered) {
    //   return (
    //     <div className="container">
    //       <Nav>
    //         <Navigation
    //           handleSignupClick={this.handleSignupClick}
    //           handleLoginClick={this.handleLoginClick}
    //           categories={this.state.categories}
    //         />
    //         {/* <LoginModal users={this.state.users} addCurrentUser={this.addCurrentUser} /> */}
    //       </Nav>
    //     </div>
    //   );
    // }

    return (
      <div className="container">
        {/* <Nav>
              <Navigation
                handleSignupClick={this.handleSignupClick}
                handleLoginClick={this.handleLoginClick}
                categories={this.state.categories}
            />
            </Nav> */}
        <CategoryView category={this.state.categories} />
        <CourseDetailView course={this.state.categories[0].courses[0]} />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);

export default App;
