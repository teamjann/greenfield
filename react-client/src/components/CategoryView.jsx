import React from 'react';
import CategoryViewCourse from './CategoryViewCourse.jsx';

const CategoryView = props => (
  <div className="container">
    <h1>{props.category.name} Courses</h1>
    {props.category &&
      props.category.courses &&
      props.category.courses.map((course, i) => <CategoryViewCourse course={course} key={i} />)}
  </div>
);

export default CategoryView;
