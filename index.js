const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

