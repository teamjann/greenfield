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
          <div className="card-body">
            <h3 className="card-title">
              {/* Link will be dynamic based on course id/ */}
              <Link to="/courses/courseid"> {this.props.course.name} </Link>
            </h3>
            <span className="card-text float-right">
              Price: ${this.props.course.description.price}
            </span>
            <h6 className="card-subtitle text-muted">
              By: {this.props.course.description.instructor}
            </h6>
            <p className="card-text">{this.props.course.description.text}</p>
          </div>

          <div className="card-footer bg-secondary">
            <button className="btn btn-primary btn-icon btn-icon-mini btn-round text-center">
              <i className="fas fa-chevron-up" />
            </button>
            <span className="card-text text-light ml-2">
              Upvote Count: {this.state.upVoteCount}
            </span>
          </div>
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
