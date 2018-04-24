import React from 'react';
import history from '../history';

class CourseDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { course } = this.props.location.state;
  }

  render() {
    return (
      <div className="container">
        <div>
          <button
            className="btn btn-primary btn-icon btn-icon-mini btn-round text-center float-left"
            onClick={history.goBack}
          >
            <i className="fas fa-arrow-left" />
          </button>
          <h1 className="text-primary text-center">{this.props.location.state.course.name}</h1>
          <p className="text-secondary">
            By {this.props.location.state.course.description.instructor}
          </p>
          <p>Price: ${this.props.location.state.course.description.price} </p>
        </div>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={this.props.location.state.course.description.videoUrl}
            allowFullScreen
          />
        </div>
        <a href={this.props.location.state.course.courseUrl}>
          {this.props.location.state.course.courseUrl}
        </a>
        <p>Description: {this.props.location.state.course.description.description}</p>
      </div>
    );
  }
}

export default CourseDetailView;
