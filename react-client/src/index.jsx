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
      currentUser: '',
    };

    this.addCurrentUser = this.addCurrentUser.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);

    this.refreshUpvotes = this.refreshUpvotes.bind(this);
    this.getCategoryInfo = this.getCategoryInfo.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
    this.getInitialUpvotes();
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
      .then(() => {})
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

  refreshUpvotes(upVotesToRefresh) {
    axios
      .patch('/api/upvotes', upVotesToRefresh)
      .then((response) => {
        const newUpvoteData = {};
        response.data.map((upvote) => {
          newUpvoteData[upvote.courseId]
            ? (newUpvoteData[upvote.courseId] = newUpvoteData[upvote.courseId] + 1)
            : (newUpvoteData[upvote.courseId] = 1);
        });
        this.setState({ upvotes: newUpvoteData }, () => {
        });
      })
      .catch(err => console.log(err));
  }
  getInitialUpvotes() {
    this.refreshUpvotes({ categoryId: '5ad7c0dffac8270c7ae8f3aa' });
  }

  render() {
    return (
      <div>
        <Navigation
          categories={this.state.categoriesList}
          addCurrentUser={this.addCurrentUser}
          logInUser={this.logInUser}
          logOutUser={this.logOutUser}
          changeCategory={this.getCategoryInfo}
          refreshUpvotes={this.refreshUpvotes}
          currentUser={this.state.currentUser}
        />
        <CategoryView
          category={this.state.currentCategory}
          refreshUpvotes={this.refreshUpvotes}
          username={this.state.currentUser}
          upvotes={this.state.upvotes}
        />
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
