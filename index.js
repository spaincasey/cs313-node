const express = require('express');
var app = express();

var rateCalculator = require('./rateCalculator.js');
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://pahknpkcrlpedi:d83deec1be30538d2c2adc176dee199285fa790092d60756e52aa0f8fd8938da@ec2-54-243-49-82.compute-1.amazonaws.com:5432/ddi8a0t03prqbk';


const pool = new Pool({connectionString: connectionString});
pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
 })

// added comment
app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res){
      res.sendFile('HomePage.html', { root: __dirname + "/public"});
   });
app.get('/getJobs', getJobs);


function getJobs(req, res) {
   console.warn("Category is: " + req.body.cat);
   console.warn(req.query.category);

	const category = req.query.cat;
	getPersonFromDb(category, function(error, result) {

		if (error || result == null || result.length != 1) {
         res.status(500).json({success: false, data: error});
         console.log("Category is: " + category);
		} else {
			const person = result[0];
			res.status(200).json(person);
		}
	});
}
function getPersonFromDb(category, callback) {
	console.log("Getting person from DB with id: " + id);
	const sql = "SELECT * FROM Jobs WHERE category = $1::text";
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