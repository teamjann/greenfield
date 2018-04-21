import React from 'react';
import ReactDOM from 'react-dom';

class Upvote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canClick: true,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <button type="button" className="btn btn-secondary">
        Upvote
      </button>
    );
  }
}

export default Upvote;

({ categoryId, courseId, userId }) => {
  /*
  if (canClick)
    canClick = false
    axios
      request = {}
      user.setState
      category.setState

*/
};
