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
app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('HomePage.html', { root: __dirname + "/public"});
   })
   .get('/getJobs', getJobs)
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   })


function getJobs(req, res) {
   console.log(req.body.selectpicker);
   // // First get the person's id
   // const id = request.query.id;

   // // TODO: We should really check here for a valid id before continuing on...

   // // use a helper function to query the DB, and provide a callback for when it's done
   // getPersonFromDb(id, function(error, result) {
   //    // This is the callback function that will be called when the DB is done.
   //    // The job here is just to send it back.

   //    // Make sure we got a row with the person, then prepare JSON to send back
   //    if (error || result == null || result.length != 1) {
   //       response.status(500).json({success: false, data: error});
   //    } else {
   //       const person = result[0];
   //       response.status(200).json(person);
   //    }
   // });
}
// pool.connect((err, client, done) => {
//    if (err) throw err
//    client.query("SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'demolition';", [1], (err, res) => {
//       done()
//       if (err) {
//          console.log(err.stack)
//       } else {
//          console.log(res.rows[0])
//       }
//    })
// })


// pool.query('SELECT * FROM user_app WHERE id = 1', [1], (err, res) => {
//    if (err) {
//      throw err
//    }
//    console.log('user:', res.rows[0])
// })
