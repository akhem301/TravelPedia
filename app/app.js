var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var path = require('path');
//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/css",  express.static(__dirname + '/../public/css'));
app.use("/images",  express.static(__dirname + '/../public/images'));
app.use("/fonts",  express.static(__dirname + '/../public/fonts'));

app.get('/index', function(req, res) {
	res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/searchtours', function(req, res) {
	res.sendFile(path.join(__dirname + '/../tours.html'));
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
