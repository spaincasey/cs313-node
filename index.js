const express = require('express');
const app = express();
var dbAccess = require('./dbAccess.js');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })
 

// ESTABLISH PORT AND SET ENDPOINTS 
app.set('port', process.env.PORT || 5000)
   .use(express.urlencoded({extended: true}))
   .use(express.json())
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.render('pages/HomePage');
   })
   .get('/jobs', dbAccess.getJobs)
   .get('/reviews', dbAccess.getReviews)
   .get('/contact', function(req, res){
      res.render('pages/contact');
   })
   .get('/getJobs', dbAccess.getJobs)
   .get('/getUser', dbAccess.getUser)
   .post('/postUser', dbAccess.postUser)
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   });