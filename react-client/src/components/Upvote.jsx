import React from 'react';
import ReactDOM from 'react-dom';

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true,
    };
  }
  componentDidMount() {
    console.log('Can clicky clicky??? ', this.state.canClick);
  }

  handleUpvoteClick(categoryId, courseId, userId) {
    /*
    if (canClick)
      canClick = false
      axios
        request = {}
        user.setState
        category.setState
  */
    if (this.state.canClick) {
      this.setState({ canClick: false }, () => {
        console.log('No more clicky clicky...');
      });
    }
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          this.props.handleUpvoteRequest({ categoryId: 2, courseId: 2, userId: 2 });
        }}
      >
        <i className="fas fa-chevron-up" />
      </button>
    );
  }
}

export default Upvote;
