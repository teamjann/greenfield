import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation.jsx';
import CategoryView from './components/CategoryView.jsx';
import CourseDetailView from './components/CourseDetailView.jsx';
import LoginModal from './components/LoginModal.jsx';
import SignupModal from './components/SignupModal.jsx';

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

  handleLoginClick() {
    this.setState({ loginModalTriggered: true, signupModalTriggered: false });
  }

  handleSignupClick() {
    this.setState({ signupModalTriggered: true });
  }

  addCurrentUser(user) {
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
    if (this.state.signupModalTriggered) {
      return (
        <div>
          <Navigation
            handleSignupClick={this.handleSignupClick}
            handleLoginClick={this.handleLoginClick}
            categories={this.state.categories}
          />
          {/* <SignupModal addCurrentUser={this.addCurrentUser} /> */}
        </div>
      );
    } else if (this.state.loginModalTriggered) {
      return (
        <div>
          <Navigation
            handleSignupClick={this.handleSignupClick}
            handleLoginClick={this.handleLoginClick}
            categories={this.state.categories}
          />
          {/* <LoginModal users={this.state.users} addCurrentUser={this.addCurrentUser} /> */}
        </div>
      );
    }

    return (
      <Router>
        <div>
          <Navigation
            handleSignupClick={this.handleSignupClick}
            handleLoginClick={this.handleLoginClick}
            categories={this.state.categories}
          />
          <CategoryView categories={this.state.categories} />
          {/* <CourseDetailView course={this.state.categories[0].courses[0]} /> */}
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
