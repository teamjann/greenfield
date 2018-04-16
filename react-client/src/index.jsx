import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Navigation from './components/Navigation.jsx';
import CategoryView from './components/CategoryView.jsx';
import CourseDetailView from './components/CourseDetailView.jsx';
import LoginModal from './components/LoginModal.jsx';

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
          password: '1234',
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

ReactDOM.render(<App />, document.getElementById('app'));
