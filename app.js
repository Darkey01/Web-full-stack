var express = require('express');
var path  = require('path');
var app = express();

global.comments = [];

app.engine('.html', require('ejs').__express);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname ,  'public')));

app.use('/api', require('./controllers'));
app.get('/*', function(req, res, next) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.listen(1337, function() {
  console.log('App Lancée');
});