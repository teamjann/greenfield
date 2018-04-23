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
// specifies cookie length and secret for creating cookies.
// the secret should be in a git ignore file
app.use(session({
  secret: 'shouldbestoredinakey',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 12 * 60 * 60 * 1000 },
}));

// passport magic don't touch. 
app.use(passport.initialize());
app.use(passport.session());

// middleware to check if user is logged in.
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end('You must log in to do that!');
};

// passport route that uses signup stragegy
app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
  console.log(req.user, ' was successfully created');
  res.status(201).json(req.user);
});

// passport route that uses login stragegy
app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
  console.log(req.user, ' was successfully logged in');
  res.status(201).json(req.user);
});

// ends session disables cookie logs you out.
app.post('/api/logout', isLoggedIn, (req, res) => {
  req.logout();
  console.log('Successfully logged out');

  res
    .clearCookie('connect.sid')
    .status(201)
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
    - POST '/api/upvote': Adds an upvote.
    - DELETE '/api/upvote': Removes an upvote.
    - PATCH '/api/upvotes': Retrieves upvotes. Send in the fields you want to filter by.
    - PATCH '/api/upvote': Processes the upvote request.
*/

// GET '/': Serves up static files and index.html.
app.use(express.static(`${__dirname}/../react-client/dist`));
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../react-client/src/index.html`));
});
// GET '/api/categories': List of all categories.
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
// GET '/api/categories/id': List of all categories.
app.get('/api/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  new Promise((resolve, reject) => {
    resolve(db.retrieveCategory(categoryId));
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});
// POST '/api/categories': Add a new cateogry.
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
// GET '/api/categories/:id/courses': List of all courses for an individual category.
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
// GET '/api/categories/:id/courses/:courseId': Detailed information about a specific course.
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
// POST '/api/categories/:id/courses': Add a new course to a category.
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
// GET '/api/users': Returns a list of each user document.
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
// GET '/api/users/:id': Returns a specific user's information.
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

// POST '/api/upvote': Adds an upvote.
app.post('/api/upvote', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.addUpVote(req.body));
  })
    .then((addedUpVote) => {
      console.log('Added successfully.', addedUpVote);
      // res.status(201).json(addedUpVote);
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).end();
    });
});

// DELETE '/api/upvote': Removes an upvote.
app.delete('/api/upvote', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.removeUpVote(req.body));
  })
    .then((removedUpVote) => {
      console.log('Removed successfully.');
      // res.status(201).end();
    })
    .catch((err) => {
      console.log(err);
      // res.status(500).end();
    });
});

// PATCH '/api/upvotes': Retrieves upvotes. Send in the fields you want to filter by.
app.patch('/api/upvotes', (req, res) => {
  new Promise((resolve, reject) => {
    resolve(db.retrieveUpVotes(req.body.categoryId, req.body.courseId, req.body.userId));
  })
    .then((upVotes) => {
      res.status(200).json(upVotes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// PATCH '/api/upvote': Processes the upvote request.
app.patch('/api/upvote', isLoggedIn, (req, res) => {
  const upVote = {
    categoryId: req.body.categoryId,
    courseId: req.body.courseId,
    userId: req.body.userId,
  };
  console.log(upVote);
  new Promise((resolve, reject) => {
    resolve(db.retrieveUpVotes(req.body.categoryId, req.body.courseId, req.body.userId));
  })
    .then((result) => {
      if (result[0]) {
        new Promise((resolve, reject) => {
          resolve(db.removeUpVote(upVote));
        })
          .then(() => {
            console.log('Removed successfully.');
            new Promise((resolve, reject) => {
              resolve(db.retrieveUpVotes(req.body.categoryId, req.body.courseId, req.body.userId));
            })
              .then((newCount) => {
                console.log('New count: ', newCount.length);
                res.status(201).json(newCount.length);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
      } else {
        new Promise((resolve, reject) => {
          resolve(db.addUpVote(upVote));
        })
          .then(() => {
            console.log('Added successfully.');
            new Promise((resolve, reject) => {
              resolve(db.retrieveUpVotes(upVote.categoryId, upVote.courseId, upVote.userId));
            })
              .then((newCount) => {
                console.log('New count: ', newCount.length);
                res.status(201).json(newCount.length);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
