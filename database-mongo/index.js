const mongoose = require('mongoose');
// mongoose.connect('mongodb://me:me@ds241019.mlab.com:41019/greenfield-dev');
mongoose.connect('mongodb://localhost/greenfield');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const courseSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  upvotes: Number,
  description: {
    createdOn: Date,
    instructor: String,
    price: Number,
    videoUrl: String,
  },
  courseUrl: String,
});

const categorySchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  courses: [courseSchema],
});

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: String,
  password: String,
  coursesUpvoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Course = mongoose.model('Course', courseSchema);
const Category = mongoose.model('Category', categorySchema);
const User = mongoose.model('User', userSchema);

const insertNewCourse = function (newCourse) {
  new Course(newCourse)
    .save()
    .then(() => console.log('New course successfully added!'))
    .catch(err => console.log(err));
};

// Uncomment me later!
// const gatherCategoryNames = function (callback) {
//   Category.find()
//     .map(category => category.name)
//     .then()
//     .catch();

// const newCourse = new Course({
//   name: 'test',
//   upvotes: 0,
//   description: { instructor: 'Bill', price: 20 },
// });

// Category.select({}, function(err, items) {
//   if(err) {
//     callback(err, null);
//   } else {
//     callback(null, items);
//   }
// });
// };

// module.exports.selectAll = selectAll;
module.exports.insertNewCourse = insertNewCourse;
