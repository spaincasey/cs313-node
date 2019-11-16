const express = require('express');
var rateCalculator = require('./rateCalculator.js');
var app = express();
// added comment
const PORT = process.env.PORT||'8080';
app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});
app.use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', function(req, res){
      res.sendFile('form.html', { root: __dirname + "/public"});
   })
   .get('/calculate', rateCalculator.calculate)
   .listen(app.get('PORT'), function() {
      console.log('Listening on PORT: ' + app.get('PORT'));
   });

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