import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Switch, Route, Router } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation.jsx';
import CategoryView from './components/CategoryView.jsx';
import CourseDetailView from './components/CourseDetailView.jsx';
import history from './history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      currentCategory: {},
      signupModalTriggered: false,
      loginModalTriggered: false,
      currentUser: '',
      // categories: [
      //   {
      //     _id: 1,
      //     name: 'React',
      //     courses: [
      //       {
      //         _id: 1,
      //         name: 'Reactify',
      //         upvotes: 100,
      //         description: {
      //           createdOn: '01.01.2001',
      //           instructor: 'Nick Fray',
      //           price: 8,
      //           videoUrl: 'https://www.youtube.com/embed/7mgvfGc7ZyU',
      //           text:
      //             "Today we're add some simple React components, while we also initialize the use of Watchify, Browserify and Reactify. Of course all while using Gulp as well! We will lay the basis of our UI, and add some placeholders for later on.",
      //         },
      //         courseUrl: 'https://www.udemy.com/understand-javascript/',
      //       },
      //     ],
      //   },
      // ],
      // users: [
      //   {
      //     _id: 1,
      //     email: 'johncrogers@test.com',
      //     password: '1234',
      //     coursesUpvoted: [],
      //   },
      // ],
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);

    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);

    this.getCategoryInfo = this.getCategoryInfo.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  handleLoginClick() {
    this.setState({ loginModalTriggered: true, signupModalTriggered: false });
  }

  handleSignupClick() {
    this.setState({ signupModalTriggered: true });
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
        that.setState({ currentUser: res.data.email });
      })
      .catch(err => err);
  }

  logInUser(user) {
    const that = this;
    axios
      .post('/api/login', user)
      .then((res) => {
        console.log('user logged in ', res);
        that.setState({ currentUser: res.data.email });
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
          categoriesList: res.data,
        }))
      .then(() => {
        this.getCategoryInfo(this.state.categoriesList[1]._id);
      })
      .catch(err => console.log(err));
  }

  getCategoryInfo(categoryID) {
    axios
      .get(`/api/categories/${categoryID}`)
      .then((res) => {
        this.setState({
          currentCategory: res.data,
        });
      })
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

    // The props here NEED TO BE CHANGED!
    return (
      <div>
        <Navigation
          categories={this.state.categoriesList}
          addCurrentUser={this.addCurrentUser}
          logInUser={this.logInUser}
          logOutUser={this.logOutUser}
          changeCategory={this.getCategoryInfo}
          currentUser={this.state.currentUser}
        />
        <CategoryView category={this.state.currentCategory} />
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path=":category/courses" component={CategoryView} />
      <Route path="/course" component={CourseDetailView} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById('app'),
);

export default App;
