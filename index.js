const express = require('express');
var app = express();

var rateCalculator = require('./rateCalculator.js');
// const { Pool } = require("pg");
// const connectionString = process.env.DATABASE_URL || "postgres://pahknpkcrlpedi:d83deec1be30538d2c2adc176dee199285fa790092d60756e52aa0f8fd8938da@eca790092d60756e52aa0f8fd8938da@ec2-54-243-49-82.compute-1.amazonaws.com:5432/ddi8a0t03prqbk";


// const pool = new Pool({connectionString: connectionString});

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

// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");

// const port = process.env.PORT || 5000;

// const calculateRate = (req, res) => {
    
// }

// const app = express()
//     .use(express.static(path.join(__dirname, 'public')))
//     .use(bodyParser.urlencoded({ extended: true}))
//     .set('views', path.join(__dirname, 'views'))
//     .set('view engine', 'ejs')
//     .get('/', (req,res) => res.render('pages/index'))
//     .post('/getRate', calculateRate)

// app.listen(port, () => {console.log('Listening on port ${port}!')})