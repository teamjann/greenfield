var mongoose = require('mongoose');
mongoose.connect('mongodb://me:me@ds241019.mlab.com:41019/greenfield-dev');

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


var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;