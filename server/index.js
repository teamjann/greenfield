const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/categories/id/courses', (req, res) => {
  const courseToInsert = req.body.courseToInsert;
  // console.log(courseToInsert);

  new Promise((resolve, reject) => {
    resolve(db.insertNewCourse(courseToInsert));
  })
    .then(() => res.status(201).end())
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.get('/api/categories/id/courses', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveCourses());
  })
    .then(courses => res.status(200).json(courses))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.post('/api/categories', (req, res) => {
  const categoryToInsert = req.body.categoryToInsert;

  new Promise((resolve, reject) => {
    resolve(db.insertNewCategory(categoryToInsert));
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
