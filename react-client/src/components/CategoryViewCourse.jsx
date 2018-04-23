import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import CourseDetailView from './CourseDetailView.jsx';

class CategoryViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upVoteCount: 0,
      isClicked: false,
      // downVoteCount = 0
    };
  }

  render() {
    return (
      // pathname: `/${slugify(`${this.props.course.name}`)}`,
      <div className="card">
        <Link
          to={{
            pathname: '/course',
            state: {
              course: this.props.course,
            },
          }}
        >
          <div className="card-body">
            <h3 className="card-title">{this.props.course.name}</h3>
            <span className="card-text float-right">
              Price: ${this.props.course.description.price}
            </span>
            <h6 className="card-subtitle text-muted">
              By: {this.props.course.description.instructor}
            </h6>
            <p className="card-text text-secondary">{this.props.course.description.description}</p>
            <p className="card-subtitle small text-muted text-center">Click for more details</p>
          </div>
        </Link>

        <div className="card-footer bg-secondary">
          <button className="btn btn-primary btn-icon btn-icon-mini btn-round text-center">
            <i className="fas fa-chevron-up" />
          </button>
          <span className="card-text text-light ml-2">Upvote Count: {this.state.upVoteCount}</span>
        </div>
      </div>
    );
  }
}

export default CategoryViewCourse;
