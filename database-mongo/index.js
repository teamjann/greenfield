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
  id: {
    type: Number,
    auto: true,
  },
  name: String,
  courses: [
    {
      id: {
        type: Number,
        auto: true,
      },
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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  email: String,
  password: String,
  coursesUpvoted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const upVoteSchema = mongoose.Schema({
  categoryId: String,
  courseId: String,
  userId: String,
});

const Category = mongoose.model('Category', categorySchema);
const User = mongoose.model('User', userSchema);
const Upvote = mongoose.model('Upvote', upVoteSchema);

/*
FUNCTION LEGEND:
  CATEGORY:
    - retrieveCategory
    - retrieveCategories
    - insertNewCategory
  COURSE:
    - retrieveCourse
    - retrieveCourses
    - insertNewCourse
  USER:
    - retrieveUser
    - retrieveUsers
    - insertNewUser
  UPVOTE:
    - addUpVote
    - removeUpVote
    - retrieveUpvotes
*/

module.exports.retrieveCategory = categoryId =>
  Category.findOne({
    _id: categoryId,
  })
    .then(category => category)
    .catch(err => console.log(err));

module.exports.retrieveCategories = () =>
  Category.find({})
    .select('name id')
    .then(allCategoriesArray => allCategoriesArray)
    .catch(err => console.log(err));

module.exports.insertNewCategory = (newCategory) => {
  new Category(newCategory)
    .save()
    .then(() => console.log('New category successfully added!'))
    .catch(err => console.log(err));
};

module.exports.retrieveCourse = (categoryId, courseId) =>
  Category.findOne({
    _id: categoryId,
  })
    .then(category => category.courses)
    .catch(err => console.log(err));

module.exports.retrieveCourses = categoryId =>
  Category.findOne({
    _id: categoryId,
  })
    .select('courses')
    .then(allCourses => allCourses)
    .catch(err => console.log(err));

module.exports.insertNewCourse = (courseToBeAdded, categoryId) =>
  Category.findOneAndUpdate(
    {
      _id: categoryId,
    },
    {
      $push: {
        courses: courseToBeAdded,
      },
    },
  )
    // .save()
    .then(() => console.log('New course successfully added!'))
    .catch(err => console.log(err));

module.exports.retrieveUser = userEmail =>
  User.findOne({
    email: userEmail,
  })
    .then(user => user)
    .catch(err => console.log(err));

module.exports.retrieveUsers = userEmail =>
  User.find()
    .then(users => users)
    .catch(err => console.log(err));

module.exports.insertNewUser = newUser =>
  User.findOne({
    email: newUser.email,
  })
    .then(user => console.log(user.email, ' allready exists'))
    .catch(() => {
      new User(newUser)
        .save()
        .then(() => console.log('New user sucessfully added!'))
        .catch(err => console.log(err));
    });

module.exports.addUpVote = (upVote) => {
  new Upvote(upVote)
    .save()
    .then(result => console.log(`Added ${JSON.stringify(result)}`))
    .catch(err => console.log(err));
};

module.exports.removeUpVote = (upVote) => {
  Upvote.deleteMany(upVote)
    .then(result => console.log(`Removed ${JSON.stringify(result)}`))
    .catch(err => console.log(err));
};

module.exports.retrieveUpVotes = (categoryId, courseId, userId) => {
  const query = {};
  if (categoryId) query.categoryId = categoryId;
  if (courseId) query.courseId = courseId;
  if (userId) query.userId = userId;
  return Upvote.find(query)
    .then(result => result)
    .catch(err => err);
};
