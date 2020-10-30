////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const path = require("path");

/**
 * =============================================================================
 * CONNECTING TO MONGO ATLAS FROM SERVER
 * =============================================================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe, Waqas Rehmani
 *
 * The db.js is used for connecting the server to mongoDB so that data storage and retrieval can take place.
 *
 */

const url =
    process.env.MONGOURI ||
    require(path.join(__dirname, "..", "config/keys")).MongoURI;

// Connect to MongoDB using the MongoURI
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("connected to the DB");
        } else {
            console.log("mongoose error", err);
        }
    }
);

////////////////////////////////////////////////////////////////////////////////
////                            Import all Models                           ////
////////////////////////////////////////////////////////////////////////////////
require("./questionnaire.js");
require("./clinician.js");
require("./share");
require("./instruction.js");
require("./admin.js");
