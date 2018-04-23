import React from 'react';
import ReactDOM from 'react-dom';
import CategoryViewCourse from './CategoryViewCourse.jsx';

// class CategoryView extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentDidMount() {
//     console.log('MADE IT');
//     const { category } = this.props.location.state;
//     this.setState({
//       category: this.props.location.state.category,
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <h1>{this.props.location.state.category.name} Courses</h1>
//         {this.props.location &&
//           this.props.location.state.category &&
//           this.props.location.state.category.courses &&
//           this.props.location.state.category.courses.map((course, i) => (
//             <CategoryViewCourse
//               category={this.props.location.state.category}
//               course={course}
//               key={i}
//             />
//           ))}
//       </div>
//     );
//   }
// }

const CategoryView = props => (
  <div className="container">
    <h1>{props.category.name} Courses</h1>
    {props.category &&
      props.category.courses &&
      props.category.courses.map((course, i) => (
        <CategoryViewCourse
          category={props.category}
          course={course}
          key={i}
          upvoteCount={
            props.upvotes
              ? props.upvotes.filter(upvote => upvote.courseId === JSON.stringify(course.id)).length // console.log('props.upvotes in category view: ', props.upvotes)
              : 0 // console.log('No upvotes in category view props.')
          }
          refreshUpvotes={props.refreshUpvotes}
          // log={console.log(course.id)}
        />
      ))}
  </div>
);

export default CategoryView;
