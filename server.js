var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var request = require('request');
var exphbs = require('express-handlebars');

var db = require('./models');

var app = express();

var PORT = process.env.PORT || 3000;

// comment out hbs for testing
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
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

app.get('/scrape', function (req, res) {
    // scrape  code here
    request('http://www.brooklynvegan.com/', function (error, response, html) {
        var $ = cheerio.load(html);
        var results = [];
    $('article.post').each(function (i, element) {
        var title = $(element).find('a').text();
        var link = $(element).find('a').attr('href');
        var excerpt = $(element).find('p.excerpt').text();
        results.push({
            title: title,
            link: link,
            excerpt: excerpt,
            });
        });
        console.log(results);
        db.Article.create(results)
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                return res.json(err)
            });
    res.render('index');
    });
});

app.get('/articles', function (req, res) {
    // article code goes here
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get('/articles/:id', function (req, res) {
    // should display the notes associated with articles 
    db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.post('/articles/:id', function(req, res) {
//    post note comment code
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Server 
app.listen(PORT, function () {
    console.log('App running on port ' + PORT + '!!');
});