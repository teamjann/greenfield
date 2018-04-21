const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const db = require('../database-mongo/index');
const path = require('path');

const app = express();
require('../database-mongo/config')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

/*-------------------------------------------------------------------
          Authorization! :)
-------------------------------------------------------------------*/

app.use(session({
  secret: 'shouldbestoredinakey',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 12 * 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware to check if user is logged in.
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end('You must log in to do that!');
};

app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
  console.log('sign up called');
  res.status(200).json(req.user);
});

app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
  res.status(200).json(req.user);
});

app.post('/api/logout', isLoggedIn, (req, res) => {
  req.logout();
  res
    .clearCookie('connect.sid')
    .status(200)
    .redirect('/');
});

/*-------------------------------------------------------------------
          No Longer Authorization! :)
-------------------------------------------------------------------*/

/*
ROUTE LEGEND:
  STATIC:
    - GET '/': Serves up static files and index.html.
  CATEGORY:
    - GET '/api/categories': List of all categories.
    - GET '/api/categories/:id': Detail view of category.
    - POST '/api/categories': Add a new cateogry.
  COURSE:
    - GET '/api/categories/:id/courses': List of all courses for an individual category.
    - GET '/api/categories/:id/courses/:courseId': Detailed information about a specific course.
    - POST '/api/categories/:id/courses': Add a new course to a category.
  USER:
    - GET '/api/users': Returns a list of each user document.
    - GET '/api/users/:id': Returns a specific user's information.
    - POST '/api/users': Adds a new user to the database.
  UPVOTE:
    - POST '/api/upvote': Updates the upvote status.
*/

// GET '/': Serves up static files and index.html.
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
// GET '/api/categories/:id': Detail view of category.
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
app.get('/api/categories/:category/courses/:course', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveCourse(req.params.category));
  })
    .then((courseList) => {
      const selectedCourse = courseList.filter(course => course._id == req.params.course);
      if (selectedCourse.length > 0) {
        console.log('Entered');
        res.status(200).json(selectedCourse[0]);
      } else {
        console.log(courseList);
        res.status(404).end();
      }
    })
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

// UPVOTE POST '/api/upvote': Adds an upvote.
app.post('/api/upvote', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.addUpVote(req.body));
  })
    .then((addedUpVote) => {
      console.log('Added successfully.');
      res.status(201).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// UPVOTE DELETE '/api/upvote': Removes an upvote.
app.delete('/api/upvote', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.removeUpVote(req.body));
  })
    .then((removedUpVote) => {
      console.log('Removed successfully.');
      res.status(201).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.patch('/api/upvote', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveUpVotes(req.body.categoryId, req.body.courseId, req.body.userId));
  })
    .then(upVotes => res.status(200).json(upVotes))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
