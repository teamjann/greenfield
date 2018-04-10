var mongoose = require('mongoose');
// mongoose.connect('mongodb://me:me@ds241019.mlab.com:41019/greenfield-dev');
mongoose.connect('mongodb://localhost/greenfield');


var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  upvotes: Number,
  description: {
    createdOn: Date,
    instructor: String,
    price: Number,
    videoUrl: String
  },
  courseUrl: String
});

var categorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  courses: [courseSchema]
});

var userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  coursesUpvoted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});



var Course = mongoose.model('Course', courseSchema);
var Category = mongoose.model('Category', categorySchema);
var User = mongoose.model('User', userSchema);

var newCourse = new Course({name: "test", upvotes: 0, description: {instructor: 'Bill', price: 20}});



var gatherCategoryNames = function(callback) {
  Category.find()
  .map( category => category.name )
  .then()
  .catch();


  // Category.select({}, function(err, items) {
  //   if(err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, items);
  //   }
  // });
};

// module.exports.selectAll = selectAll;