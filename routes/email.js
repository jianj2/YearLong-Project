/**
 * ===============================================
 * ROUTES OF QUESTIONNAIRES (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 24 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/questionnaire.js is used for defining the routes of each API call in questionnaire_controller made from the frontend.
 */


var express = require('express');
var router = express.Router();
var email_controller = require('../controller/email_controller.js');

// CRUD Routes for Posts
router.get('/send', email_controller.send);


module.exports = router;
