const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
ROUTE LEGEND:
  STATIC '/': Serves up static files and index.html.
  CATEGORIES GET '/api/categories': List of all categories.
  CATEGORY POST '/api/categories': Add a new cateogry.
  COURSES GET '/api/categories/:id/courses': List of all courses for an individual category.
  COURSE GET '/api/categories/:id/courses/:courseId': Detailed information about a specific course.
  COURSE POST '/api/categories/:id/courses': Add a new course to a category.
  USER GET '/api/users': Returns a list of each user document.
  USER GET '/api/users/:id': Returns a specific user's information.
  USER POST '/api/users': Adds a new user to the database.
*/

// STATIC '/': Serves up static files and index.html.
app.use(express.static(`${__dirname}/../react-client/dist`));
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../react-client/src/index.html`));
});
// CATEGORY GET '/api/categories': List of all categories.
app.get('/api/categories', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveCategories());
  })
    .then(categories => res.status(200).json(categories))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// CATEGORY POST '/api/categories': Add a new cateogry.
app.post('/api/categories', (req, res) => {
  const categoryToInsert = req.body;

  new Promise((resolve, reject) => {
    resolve(db.insertNewCategory(categoryToInsert));
  })
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// COURSE GET '/api/categories/:id/courses': List of all courses for an individual category.
app.get('/api/categories/:id/courses', (req, res) => {
  const categoryToRetrieveCourses = req.params.id;
  new Promise((resolve, reject) => {
    resolve(db.retrieveCourses(categoryToRetrieveCourses)); // send down specific course
  })
    .then(courses => res.status(200).json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// COURSE GET '/api/categories/:id/courses/:courseId': Detailed information about a specific course.
app.get('/api/category/:category/courses/:courseId', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveCourse(req.params.category, req.params.courseId));
  })
    .then(course => res.status(200).json(course))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// COURSE POST '/api/categories/:id/courses': Add a new course to a category.
app.post('/api/categories/:id/courses', (req, res) => {
  const categoryToInsertCourse = req.params.id;
  console.log(req.body);
  const courseToInsert = req.body;

  new Promise((resolve, reject) => {
    resolve(db.insertNewCourse(courseToInsert, categoryToInsertCourse));
  })
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// USER GET '/api/users': Returns a list of each user document.
app.get('/api/users', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveUsers());
  })
    .then(users => res.status(200).json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// USER GET '/api/users/:id': Returns a specific user's information.
app.get('/api/users/:id', (req, res) => {
  const userToRetrieve = req.params.id;

  new Promise((resolve, reject) => {
    resolve(db.retrieveUser(userToRetrieve));
  })
    .then(user => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// USER POST '/api/users': Adds a new user to the database.
app.post('/api/users', (req, res) => {
  const userToInsert = req.body;

  new Promise((resolve, reject) => {
    resolve(db.insertNewUser(userToInsert));
  })
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
