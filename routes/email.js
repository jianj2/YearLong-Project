/**
 * ===============================================
 * ROUTES OF EMAIL (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 24 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/email.js is used for defining the routes of each API call in email_controller made from the frontend.
 */


var express = require('express');
var router = express.Router();
var email_controller = require('../controller/email_controller.js');

// CRUD Routes for Emails
router.post('/submit', email_controller.send);

module.exports = router;
