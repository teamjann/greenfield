const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const path = require('path');

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../react-client/src/index.html`));
});

app.post('/api/categories/:id/courses', (req, res) => {
  const categoryToInsertCourse = req.params.id;
  const courseToInsert = req.body;
  // console.log(courseToInsert);

  new Promise((resolve, reject) => {
    resolve(db.insertNewCourse(courseToInsert, categoryToInsertCourse));
  })
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
