const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./models/db.js');

// CORS
const cors = require('cors');
app.use(cors());

// defining routes
const indexRouter = require('./routes');
const clinicianRouter = require('./routes/clinician');
const questionnaireRouter = require('./routes/questionnaire');
const adminRouter = require('./routes/admin');
const shareRouter = require('./routes/share');



// using routes

app.use('/', indexRouter);
app.use('/clinician/', clinicianRouter);
app.use('/questionnaire/', questionnaireRouter);
app.use('/admin/', adminRouter);
app.use('/share/', shareRouter);


console.log(process.env.CLIENT)
// console.log(process.env)
console.log("Testing testing testing")


const port = process.env.PORT || 3001;
app.listen(port, function (req,res) {
    console.log("server is running on port " + port + "!");
});
