import React from 'react';
import { Link } from 'react-router-dom';
import Upvote from './Upvote.jsx';

class CategoryViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }
  componentDidMount() {}

  render() {
    return (
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
          <Upvote
            categoryId={this.props.category._id}
            courseId={this.props.course.id}
            refreshUpvotes={this.props.refreshUpvotes}
            username={this.props.username}
            upvotes={this.props.upvotes}
          />
        </div>
      </div>
    );
  }
}

export default CategoryViewCourse;
