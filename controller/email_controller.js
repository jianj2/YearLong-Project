/**
 * ============================================
 * DEFINING QUESTIONNAIRE API CALLS CONTROLLER
 * ============================================
 * @date created: 24 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The questionnaire_controller is used for defining the functionality of api calls related to questionnaires.
 *
 */

var nodemailer = require('nodemailer');

var send = function (req,res) {
    // var newClinician = new Clinician({
    //     clinicianId: 'id1',
    //     name: "Uvin Abeysinghe",
    //     email: "asb@salkdjac.om",
    //     questionnaires: ['questionnaireId1', 'questionnaireId2'],
    // });
    //
    // newClinician.save(function(err, createdClinician) {
    //     if (!err){
    //         res.send(createdClinician);
    //     } else {
    //         res.send(err);
    //     }
    // })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ssq.paediatric@gmail.com',
            pass: 'ps@12345'
        }
    });

    var mailOptions = {
        from: 'ssq.paediatric@gmail.com',
        to: 'donuvin@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.send = send;