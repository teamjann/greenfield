import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import CourseDetailView from './CourseDetailView.jsx';

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
      <Router>
        <div className="card">
          <h3>
            {/* Link will be dynamic based on course id/ */}
            <Link to="/courses/courseid"> Course Title: {this.props.course.name} </Link>
          </h3>
          <span>Price: ${this.props.course.description.price}</span>
          <span>Instructor: {this.props.course.description.instructor}</span>
          <span>Upvote Count: {this.state.upVoteCount}</span>
          <p>{this.props.course.description.text}</p>
          {/* // Display course detail view onClick */}
          <Route
            path="/courses/courseid"
            render={() => <CourseDetailView course={this.props.course} />}
          />
        </div>
      </Router>
    );
  }
}

export default CategoryViewCourse;
