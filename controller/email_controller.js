/**
 * ============================================
 * DEFINING QUESTIONNAIRE API CALLS CONTROLLER
 * ============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The questionnaire_controller is used for defining the functionality of api calls related to questionnaires.
 *
 */

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;

// Get all questionnaires
var sendEmail = function (req, res, next) {
    MailConfig.ViewOption(gmailTransport,hbs);
    let HelperOptions = {
        from: '"SSQ Paediatric" <ssq.paediatric@gmail.com>',
        to: 'donuvin@gmail.com',
        subject: 'Hellow world!',
        template: 'test',
        context: {
            name:"SSQ Paediatric",
            email: "ssq.paediatric@gmail.com",
            address: "Testing, hello"
        }
    };
    gmailTransport.sendMail(HelperOptions, (error,info) => {
        if(error) {
            console.log(error);
            res.json(error);
        }
        console.log("email is send");
        console.log(info);
        res.json(info)
    });
};

module.exports.sendEmail = sendEmail;