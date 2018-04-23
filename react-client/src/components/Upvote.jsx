import React from 'react';
import axios from 'axios';

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true,
      categoryId: this.props.categoryId,
      courseId: this.props.courseId,
    };
  }
  componentDidMount() {}

  handleUpvoteClick() {
    // Is the user logged in? Username only fills when user is logged in.
    if (this.props.username !== '') {
      // Can the button be clicked? Used to prevent spamming.
      if (this.state.canClick) {
        // Disallow clicking until the upvote request has completed.
        this.setState({ canClick: false }, () => {
          // Request that the upvote is toggled.
          new Promise((resolve, reject) => {
            resolve(axios
              .patch('/api/upvote', {
                categoryId: this.props.categoryId,
                courseId: this.props.courseId,
                userId: this.props.username,
              })
              .then((response) => {
                // Once the upvote request has ben fullfilled, allow clicking.
                this.setState({ canClick: true }, () => {
                  // Then refresh the upvote data in app level state. refreshUpvotes has been bound to app level.
                  this.props.refreshUpvotes({ categoryId: this.props.categoryId });
                });
              })
              .catch((err) => {
                console.log(err);
              }));
          })
            .then((data) => {})
            .catch((err) => {});
        });
        // User is spamming the upvote button faster than the request can be processed.
      } else console.log('Can not click yet.');
    }
    console.groupEnd();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            this.handleUpvoteClick();
          }}
        >
          <i className="fas fa-chevron-up" />
        </button>
        <span className="card-text text-light ml-2">
          Upvote Count:{this.props.upvotes[this.props.courseId] || 0}
        </span>
      </div>
    );
  }
}

export default Upvote;
