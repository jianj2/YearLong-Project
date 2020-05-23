var express = require('express');
var router = express.Router();

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;


var express = require('express');
var router = express.Router();
var email_controller = require('../controller/email_controller.js');

// CRUD Routes for Posts
router.get('/', email_controller.sendEmail);

module.exports = router;

