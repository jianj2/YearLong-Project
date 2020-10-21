/**
 * =============================================================================
 * MAIN FILE FOR NODE/EXPRESS APPLICATION
 * =============================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Uvin Abeysinghe
 *
 * This file defines everything for our server and serves it on the defined
 * port.
 *
 */

// Import Libraries.
const express = require("express");
const bodyParser = require("body-parser");

////////////////////////////////////////////////////////////////////////////////
////                     Define & Configure Middleware                      ////
////////////////////////////////////////////////////////////////////////////////
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

require("./models/db.js");

////////////////////////////////////////////////////////////////////////////////
////                              Define Routes                             ////
////////////////////////////////////////////////////////////////////////////////
const indexRouter = require("./routes");
const clinicianRouter = require("./routes/clinician");
const questionnaireRouter = require("./routes/questionnaire");
const adminRouter = require("./routes/admin");
const shareRouter = require("./routes/share");

////////////////////////////////////////////////////////////////////////////////
////                              Using Routes                              ////
////////////////////////////////////////////////////////////////////////////////
app.use("/", indexRouter);
app.use("/clinician/", clinicianRouter);
app.use("/questionnaire/", questionnaireRouter);
app.use("/admin/", adminRouter);
app.use("/share/", shareRouter);

const port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log("server is running on port " + port + "!");
});
