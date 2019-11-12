const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 5000;

const calculateRate = (req, res) => {
    
}

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.urlencoded({ extended: true}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req,res) => res.render('pages/index'))
    .post('/getRate', calculateRate)

app.listen(port, () => {console.log('Listening on port ${port}!')})