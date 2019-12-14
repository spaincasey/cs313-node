const express = require('express');
const app = express();
var dbAccess = require('./dbAccess.js');
var session = require("express-session");
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

app.use(session({
   secret: 'construction-project-secret',
   resave: false,
   saveUninitialized: true
}))

// ESTABLISH PORT AND SET ENDPOINTS 
app.set('port', process.env.PORT || 5000)
   .use(express.urlencoded({extended: true}))
   .use(express.json())
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      sess = req.session;
      if(sess.user != undefined) {
            res.render('pages/HomePage', {user: sess.user});
            console.log("User set: " + sess.user);
      } else {
            res.render('pages/HomePage', {user: sess.user});
            console.log("User NOT set");
      }
   })
   .get('/jobs', dbAccess.getJobs)
   .get('/reviews', dbAccess.getReviews)
   .get('/contact', function(req, res){
      sess = req.session;
      if(sess.user != undefined) {
            res.render('pages/contact', {user: sess.user});
            console.log("User set: " + sess.user);
      } else {
            res.render('pages/contact', {user: sess.user});
            console.log("User NOT set");
      }
      res.render('pages/contact');
   })
   .get('/getJobs', dbAccess.getJobs)
   .get('/getUser', dbAccess.getUser) 
   .post('/postUser', dbAccess.postUser)
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   });


 
//  app.use(function (req, res, next) {
//    if (!req.session.views) {
//      req.session.views = {}
//    }
 
//    // get the url pathname
//    var pathname = parseurl(req).pathname
 
//    // count the views
//    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
 
//    next()
//  })