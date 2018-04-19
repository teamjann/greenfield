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
      <div className="container">
        <div>
          {/* Implement back button router functionality */}
          <button
            className="btn btn-primary btn-icon btn-icon-mini btn-round text-center float-left"
            onClick={this.props.courseDetailClicked}
          >
            <i className="fas fa-arrow-left" />
          </button>
          <h1 className="text-primary text-center">{this.props.course.name}</h1>
          <p className="text-secondary">By {this.props.course.description.instructor}</p>
          <p>Price: ${this.props.course.description.price} </p>
        </div>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={this.props.course.description.videoUrl}
            allowFullScreen
          />
          <a href={this.props.course.courseUrl}>{this.props.course.courseUrl}</a>
        </div>
        <p>Description: {this.props.course.description.text}</p>
      </div>
    );
  }
}

export default CourseDetailView;
