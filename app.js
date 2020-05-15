var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./models/db.js');

// CORS
var cors = require('cors');
app.use(cors());

// defining routes
var indexRouter = require('./routes');
var clinicianRouter = require('./routes/clinician');
var questionnaireRouter = require('./routes/questionnaire');


// using routes

app.use('/', indexRouter);
app.use('/clinician/', clinicianRouter);
app.use('/questionnaire/', questionnaireRouter);



var port = process.env.PORT || 3001;
app.listen(port, function (req,res) {
    console.log("server is running on port " + port + "!");
});
