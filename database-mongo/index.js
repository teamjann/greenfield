const mongoose = require('mongoose');

mongoose.connect('mongodb://me:me@ds241019.mlab.com:41019/greenfield-dev');
// mongoose.connect('mongodb://localhost/greenfield');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const categorySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  courses: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      name: String,
      upvotes: Number,
      description: {
        createdOn: Date,
        instructor: String,
        price: Number,
        videoUrl: String,
        description: String,
      },
      courseUrl: String,
    },
  ],
});

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: String,
  password: String,
  coursesUpvoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Category = mongoose.model('Category', categorySchema);
const User = mongoose.model('User', userSchema);

const retrieveCategory = function (categoryId) {
  return Category.findOne({ _id: categoryId })
    .then(category => category)
    .catch(err => console.log(err));
};

const insertNewCourse = function (courseToBeAdded, categoryId) {
  // needs work...
  return Category.findOneAndUpdate({ _id: categoryId }, { $push: { courses: courseToBeAdded } })
    .save()
    .then(() => console.log('New course successfully added!'))
    .catch(err => console.log(err));
};

const retrieveCourses = function (categoryId) {
  return Category.findOne({ _id: categoryId })
    .select('courses')
    .then(allCourses => allCourses)
    .catch(err => console.log(err));
};

const insertNewCategory = function (newCategory) {
  new Category(newCategory)
    .save()
    .then(() => console.log('New category successfully added!'))
    .catch(err => console.log(err));
};

const retrieveCategories = function () {
  return Category.find({})
    .select('name', 'id')
    .then(allCategoriesArray => allCategoriesArray)
    .catch(err => console.log(err));
};

const insertNewUser = function (newUser) {
  new User(newUser)
    .save()
    .then(() => console.log('New user sucessfully added!'))
    .catch(err => console.log(err));
};

const retrieveUser = function (userEmail) {
  return User.findOne({ email: userEmail })
    .then(user => user)
    .catch(err => console.log(err));
};

module.exports.insertNewCourse = insertNewCourse;
module.exports.retrieveCourses = retrieveCourses;
module.exports.insertNewCategory = insertNewCategory;
module.exports.retrieveCategories = retrieveCategories;
module.exports.insertNewUser = insertNewUser;
module.exports.retrieveUser = retrieveUser;
