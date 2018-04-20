import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation.jsx';
import CategoryView from './components/CategoryView.jsx';
import CourseDetailView from './components/CourseDetailView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategories: [],
      currentCourses: [],
      currentCourse: [],
      currentUser: '',
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
                videoUrl: 'https://www.youtube.com/embed/7mgvfGc7ZyU',
                text:
                  "Today we're add some simple React components, while we also initialize the use of Watchify, Browserify and Reactify. Of course all while using Gulp as well! We will lay the basis of our UI, and add some placeholders for later on.",
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

    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  componentDidMount() {
    // this.getAllCategories();
  }
  /*
  -------------------------------------------------------------------
          Authorization! :)
  -------------------------------------------------------------------
  */
  addCurrentUser(user) {
    const that = this;
    axios
      .post('/api/signup', user)
      .then((res) => {
        that.setState({ currentUser: res.username });
      })
      .catch(err => err);
  }

  logInUser(user) {
    const that = this;
    axios
      .post('/api/login', user)
      .then((res) => {
        console.log('user logged in ', res);
        that.setState({ currentUser: res.username });
      })
      .catch(err => console.log(err));
  }

  logOutUser() {
    const that = this;
    axios
      .post('/api/logout')
      .then((res) => {
        console.log('user logged out', res);
        that.setState({ currentUser: '' });
      })
      .catch(err => console.log(err));
  }
  /*
-------------------------------------------------------------------
          No Longer Authorization! :)
-------------------------------------------------------------------
*/

  getAllCategories() {
    axios
      .get('/api/categories')
      .then(res =>
        this.setState({
          currentCategories: res.data,
        }))
      .catch(err => console.log(err));
  }

  getCoursesforCategory(category) {
    axios
      .get(`/api/categories/${category._id}/courses`)
      .then(res =>
        this.setState({
          currentCourses: res.data,
        }))
      .catch(err => console.log(err));
  }

  // Use _id or id? _id is mongoose generated id
  getSpecificCourse(category, course) {
    axios
      .get(`/api/categories/${category._id}/courses/${course.id}`)
      .then(res =>
        this.setState({
          currentCourse: res.data,
        }))
      .catch(err => console.log(err));
  }

  createNewCategory(category) {
    axios
      .post('/api/categories', { newCategory: category })
      .then((res) => {
        this.getAllCategories();
      })
      .catch(err => console.log(err));
  }

  createNewCourse(category, course) {
    axios
      .post(`/api/categories/${category._id}/courses`, { newCourse: course })
      .then((res) => {
        this.getCoursesforCategory(category);
      })
      .catch(err => console.log(err));
  }

  render() {
    // The props here NEED TO BE CHANGED!
    return (
      <div>
        <Navigation
          categories={this.state.categories}
          addCurrentUser={this.addCurrentUser}
          logInUser={this.logInUser}
          logOutUser={this.logOutUser}
          currentUser={this.state.currentUser}
        />
        <CategoryView category={this.state.categories} />
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
