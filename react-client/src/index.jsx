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
          name: 'johncrogers@test.com',
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
          <SignupModal addCurrentUser={this.addCurrentUser} />
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
          <LoginModal users={this.state.users} addCurrentUser={this.addCurrentUser} />
        </div>
      );
    }

    return (
      <div>
        <Navigation
          handleSignupClick={this.handleSignupClick}
          handleLoginClick={this.handleLoginClick}
          categories={this.state.categories}
        />
        <CategoryView categories={this.state.categories} />
        <CourseDetailView course={this.state.categories[0].courses[0]} />
      </div>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
      modalTriggered: false,
    };
  }
  render() {
    return (
      <nav>
        <a href="">Home</a>
        <select placeholder="select a catergory">
          {this.props.categories.map(category => <option>{category.name}</option>)}
        </select>
        <button>Sign In</button>
        <button>Sign Out</button>
        <button>Log Out</button>
      </nav>
    );
  }
}

const CategoryView = props => (
  <div>
    <h3>Category: </h3>
    <CategoryViewCourse course={props.categories[0].courses[0]} />
  </div>
);

class CategoryViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upVoteCount: 0,
      // downVoteCount = 0
    };
  }
  render() {
    return (
      <div className="make me a card">
        <h3>Course Title: {this.props.course.name}</h3>
        <span>Price: ${this.props.course.description.price}</span>
        <span>Instructor: {this.props.course.description.instructor}</span>
        <span>Upvote Count: {this.state.upVoteCount}</span>
        <p>{this.props.course.description.text}</p>
      // Display course detail view onClick
      </div>
    );
  }
}

class CourseDetailView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <button>Back</button>
          <h3>Course Title: {this.props.course.name}</h3>
          <span>Hosted: {this.props.course.courseUrl}</span>
          <span>Price: {this.props.course.description.price}$ </span>
        </div>
        <div>
          <iframe src={this.props.course.description.videoUrl} />
          <p>Decription: {this.props.course.description.text}</p>
        </div>
      </div>
    );
  }
}

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
        <button>Close</button>
        <form>
          <label>Username</label>
          <input type="email" />
          <label>Password</label>
          <input type="password" />
        </form>
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
