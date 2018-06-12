var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');

var database = require('./routes/database')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8081, function(){
    console.log("Express server has started on port 8081");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use('/database', database);