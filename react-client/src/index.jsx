import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
                videoUrl: 'http://www.awesomecatpics.com',
                text: 'party',
              },
              courseUrl: 'http://www.awesomedogpics.com',
            },
          ],
        },
      ],
      users: [
        {
          _id: 1,
          name: 'johncrogers',
          passwrod: '1234',
          coursesUpvoted: [],
        },
      ],
    };
  }

  componentDidMount() {
    axios
      .get('/api/categories')
      .then(res =>
        this.setState({
          categories: res,
        }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Navigation categories={this.state.categories} />
        <CategoryView categories={this.state.categories} />
        <CourseDetailView course={this.state.categories[0].courses[0]} />
        <LoginModal />
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
