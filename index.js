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

pool.connect((err, client, done) => {
   if (err) throw err
   client.query("SELECT * FROM Job JOIN Category USING(id) WHERE cat_name = 'demolition';", [1], (err, res) => {
      done()
      if (err) {
         console.log(err.stack)
      } else {
         console.log(res.rows[0])
      }
   })
})

// added comment
app.set('port', process.env.PORT || 5000)
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('HomePage.html', { root: __dirname + "/public"});
   })
   .get('/calculate', rateCalculator.calculate)
   .listen(app.get('port'), function() {
      console.log('Listening on port: ' + app.get('port'));
   })
