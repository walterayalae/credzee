const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const babelify = require('babelify');
const Path = require('path');
const db = require('./db');
const dbInit = require('./dbInit');
const routes = express.Router();

//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js', {
    // Bundles all client-side es6, JSX, and CSS/SCSS/SASS
    transform: ['babelify', 'scssify'],
  })
);

//
// Static assets (html, etc.)
//
const assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))
//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
});

/*
  **********************************************************************************************

  ROUTING STARTS HERE

  **********************************************************************************************
*/

routes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

/*

/*
  **********************************************************************************************

  Handles endpoints for Store data. Methods served are GET, POST, PUT, DELETE.

  Make sure you are running the Neo4j server first!

  **********************************************************************************************
*/

routes.get('/api/users/all', (req, res) => {
  db.findAllUsers()
  .then(users => {
    res.status(200).send(users);
  });

});

routes.post('/api/user/create', (req, res) => {
  db.createUser(req.body.user)
  .then(newUser => {
    res.status(201).send(newStore);
  });
});


/*
Starts Database with dummy data
 */
routes.get('/db_reset', (req, res) => {
  dbInit.reset()
  .then(() => {
    res.status(201).send('Database Reset!');
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});








if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  const app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  const port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}