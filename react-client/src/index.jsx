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
      <CategoryListView />
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

ReactDOM.render(<App />, document.getElementById('app'));