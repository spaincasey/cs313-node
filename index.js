const express = require('express');
var app = express();

// var rateCalculator = require('./rateCalculator.js');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;


const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

// added comment
app.set('port', process.env.PORT || 5000)
   .use(express.urlencoded({extended: true}))
   .use(express.json())
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.render('pages/HomePage');
   })
   .get('/jobs', getJobs)
   .get('/getJobs', getJobs)
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   });


function getJobs(request, response) {
   console.log("Category is: " + request.query.cat);
   const category = request.query.cat;
	getJobsFromDb(category, function(error, result) {

		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
         response.render('pages/jobs', {results: results});
      }
      
   });
}

function getJobsFromDb(category, callback) {
	const sql = "SELECT * FROM Job WHERE category = $1";
	const params = [category];
	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
   });
}