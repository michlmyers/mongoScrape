var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');
var exphbs = require('express-handlebars');

var db = require('./models');

var app = express();

var PORT = 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/scape', function(req, res) {
// scrape  code here
});

app.get('/articles', function(req, res) {
// article code goes here
})

app.get('/articles/:id', function(req, res) {
// unique article get request here
})

app.post('/articles/:id', function(req, res) {
// post article comment code
})

// Server 
app.listen(PORT, function() {
    console.log('App running on port ' + PORT + '!!');
});