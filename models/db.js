/**
 * =======================================
 * CONNECTING TO MONGO ATLAS FROM SERVER
 * =======================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The db.js is used for connecting the server to mongoDB so that data storage and retrieval can take place.
 *
 */

const mongoose = require('mongoose');

var path = require("path");

const url = require(path.join(__dirname, '..', 'config/keys')).MongoURI;

// Connect to MongoDB using the MongoURI
mongoose.connect(url,  { useNewUrlParser: true } ,  function (err) {
    if(!err){
        console.log("connected to the DB");
    }else{
        console.log('mongoose error', err);
    }

});

require('./questionnaire.js');
require('./clinician.js'); 
