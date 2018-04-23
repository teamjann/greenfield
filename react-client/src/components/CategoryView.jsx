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
          username={props.username}
          refreshUpvotes={props.refreshUpvotes}
          upvotes={props.upvotes}
        />
      ))}
  </div>
);

export default CategoryView;
