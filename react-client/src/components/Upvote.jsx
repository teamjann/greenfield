import React from 'react';
import axios from 'axios';

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true,
      // upvoteCount: this.props.upvoteCount || 0,
      // upvotesForThisCourse: this.props.upvoteCount,
      categoryId: this.props.categoryId,
      courseId: this.props.courseId,
    };
  }
  componentDidMount() {}

  handleUpvoteClick() {
    console.group('New upvote click trigger:');
    // console.log('categoryId: ', this.state.categoryId);
    // console.log('courseId: ', this.state.courseId);
    if (this.props.username !== '') {
      if (this.state.canClick) {
        // console.log('Allowed to click: ', this.state.canClick);
        this.setState({ canClick: false }, () => {
          // console.log('Clicking disabled. this.state.canClick: ', this.state.canClick);
          // console.log('Request to process upvote.');
          new Promise((resolve, reject) => {
            console.log(this.props.username);
            resolve(axios
              .patch('/api/upvote', {
                categoryId: this.props.categoryId,
                courseId: this.props.courseId,
                userId: this.props.username,
              })
              .then((response) => {
                console.log('Upvote process response:', response.data);
                this.setState({ canClick: true }, () => {
                  this.props.refreshUpvotes({ categoryId: this.props.categoryId }); // console.log('Allow clicking again. this.state.canClick: ', this.state.canClick);
                });
              })
              .catch((err) => {
                console.log(err);
              }));
          })
            .then((data) => {
              // console.log('Completed upvote process.', data);
            })
            .catch((err) => {
              // console.log('Request failure. ', err);
            });
        });
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
