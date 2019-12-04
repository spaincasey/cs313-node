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
   .get('/reviews', function(req, res){
      res.render('pages/reviews');
   })
   .get('/contact', function(req, res){
      res.render('pages/contact');
   })
   .get('/getJobs', dbAccess.getJobs)
   .post('/postUser', async(req, res) => {
      try {
         const first = req.body.first_name;
         const last  = req.body.last_name;
         const email = req.body.email;
         await console.log("First Name: " + first);
         console.log("Last Name: " + last);
         console.log("Email: " + email);
      } catch {
         console.log(error)
      }
      req.end();
   })
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   });

    // {
      // res.render('pages/jobs');
   // })f