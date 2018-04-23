import React from 'react';
import CategoryViewCourse from './CategoryViewCourse.jsx';

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
