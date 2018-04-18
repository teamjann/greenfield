import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class CourseDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          {/* Implement back button router functionality */}
          <button>Back</button>
          <h3>Course Title: {this.props.course.name}</h3>
          <span>Hosted: {this.props.course.courseUrl}</span>
          <span>Price: {this.props.course.description.price}$ </span>
        </div>
        <div>
          <iframe src={this.props.course.description.videoUrl} />
          <p>Description: {this.props.course.description.text}</p>
        </div>
      </div>
    );
  }
}

export default CourseDetailView;
