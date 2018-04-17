import React from 'react';
import CategoryViewCourse from './CategoryViewCourse.jsx';

const CategoryView = props => (
  <div>
    <h3>Category: </h3>
    {/* pass through (props, { match }) to use react router
    React Router will provide match.params.categoryId */}
    <CategoryViewCourse course={props.categories[0].courses[0]} />
  </div>
);

export default CategoryView;
