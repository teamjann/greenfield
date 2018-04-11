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
          name: "React",
          courses: [{
            _id: 1,
            name: "Reactify",
            upvotes: 100,
            description: {
              createdOn: "01.01.2001",
              instructor: "Nick Fray",
              price: 8,
              videoUrl: "http://www.awesomecatpics.com"
            },
            courseUrl: "http://www.awesomedogpics.com"
          }]
        }
      ],
      users: [
        { 
          _id: 1,
          name: "johncrogers",
          passwrod: "1234",
          coursesUpvoted: []
        }
      ]
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div>
      <Navigation />
      <CategoryView />
    </div>)
  }
}

class Navigation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCategory: '',
      modalTriggered: false
    };
  } 
  render () {
    return (
      <nav>
        <a href="">Home</a>
        <select>
          <option>Select a Category</option>
        </select>
        <button>Sign In</button>
        <button>Sign Out</button>
        <button>Log Out</button>
      </nav>
    )
  }
}

const CategoryView = (props) => {
  return {
    <div>
      <h3>Category: </h3>
      <CategoryViewCourse />
    </div>
  }
}

class CategoryViewCourse extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      upVoteCount = 0,
      // downVoteCount = 0
    }
  }
  render {
    return (
      <div class="make me a card">
        <h3>Course Title</h3>
        <span>Price: $</span>
        <span>Upvote Count</span>
        <p>
        Description Text
        </p>
        // Display course detail view onClick
      </div>
    )
  }
}

class CourseDetailView extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <div>
          <button>Back</button>
          <h3>Course Title</h3>
          <span>Hosted: </span>
          <span>Price: </span>
        </div>
        <div>
          <iframe></iframe>
          <p>Decription: Bacon sausage pork steak.</p>
        </div>
      </div>
    )
  }
}

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    render () {
      return (
        <div>
          <button>Close</button>
          <form>
            <label>Username</label>
            <input type="email" />
            <label>Password</label>
            <input type="password"/>
          </form>
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      )
    }
  }

}

ReactDOM.render(<App />, document.getElementById('app'));