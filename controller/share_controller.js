/**
 * ========================================
 * DEFINING SHARE API CALLS CONTROLLER
 * ========================================
 * @date created: 31 May 2020
 * @authors: Uvin
 *
 * The share_controller is used for defining the functionality of api calls related to share.
 *
 */

const mongoose = require("mongoose");
const Share = mongoose.model("share");
const { v1: uuidv1 } = require("uuid");
const nodemailer = require('nodemailer');
const path = require("path");
const Readable = require('stream').Readable
const PDFDocument = require('pdfkit');
const Questionnaire = mongoose.model("questionnaire");
var fs = require('fs');


// Create a new share.
const shareQuestionnaire = function (req,res) {

    // convert to a list of objects
    let visibleSection = []
    Object.entries(req.body.shareSection).map((k,v) =>{
        visibleSection.push({title: k[0], isVisible: k[1]});
    })


    const uuid = uuidv1();
    let newShare = new Share({
        shareId: uuid,
        clinicianEmail: req.body.clinicianEmail,
        patientEmail: req.body.patientEmail,
        questionnaireId: req.body.questionnaireId,
        readOnly:req.body.readOnly,
        message:req.body.message,
        shareSection:visibleSection,
    });

    console.log(req.body)

    newShare.save(function(err, createdShare) {
        if (!err){
            // Only send the email if the patient email is defined.
            if(createdShare.patientEmail != undefined){
                sendInvitationEmail(req,res,createdShare);
            }
            res.send(createdShare);
        } else {
            res.send(err);
        }
    })
};

// Get ShareDetails using ShareId
const getShareDetails = function (req, res) {
    let shareId = req.params.shareId;

    Share.findOne({ shareId }, function (
        err,
        share
    ) {
        if (!err && share != null) {
            res.send({statusCode:200, message:"Valid ShareId", data:share});
        } else {
            res.send({statusCode:400, message:"Invalid ShareId", data:err})
        }
    });
};


const completeShare = function (req,res) {
    sendResultsEmail(req,res);
    deleteShare(req,res);
}

// Sending the results in an email.
const sendResultsEmail = function (req, res) {

    let questionnaireData = req.body.questionnaireData;
    let clinicianEmail = req.body.clinicianEmail;
    let personalDetails = req.body.personalDetails;
    var total_score=0;
    var section_score=new Array();
    var total_q=0;
    var section_num=0;
    for(var i=0;i<questionnaireData.length;i++){
        var section_q=0;
        var score=0;
        for (var j=0; j<questionnaireData[i].length;j++) {
            for (var z = 0; z < questionnaireData[i][j].length; z++) {
                if (!questionnaireData[i][j][z].isMCQ) {
                    if (questionnaireData[i][j][z].value != '') {
                        score += questionnaireData[i][j][z].value;
                    }
                    section_q += 1;
                }
            }
        }
        section_score[section_num] = score / section_q;
        total_score += score;
        section_num += 1;
        total_q += section_q;
    };
    var average_score=total_score/total_q;

    // Used to create the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: require(path.join(__dirname, '..', 'config/keys')).GmailUserName,
            pass: require(path.join(__dirname, '..', 'config/keys')).GmailPassword,
        }
    });

    const doc = new PDFDocument;

        doc.font('Helvetica-Bold').fontSize(14).text("Patient Details", 80);
        // purple overlay for patient information
        doc.fillOpacity(0.1).rect(80, 100, 420, 180).fill('purple');
        doc.fillOpacity(1).fill('black');

        // prints out patient information
        doc.font('Helvetica-Bold').fontSize(12)
           .text('Patient Name', 100, 120)
           .text('Right Device Type', 100, 170)
           .text('Left Device Type', 100, 220)
           .text('Date of Birth', 300, 120)
           .text('Completed By', 300, 170);

        doc.font('Helvetica').fontSize(12)
        .text(personalDetails.name, 100, 140)
        .text(personalDetails.date, 300, 140)
        .text(personalDetails.rightDeviceType, 100, 190)
        .text(personalDetails.leftDeviceType, 100, 240)
        .text(personalDetails.completedBy, 300, 190);

        // prints out title for questionnaire response
        doc.font('Helvetica-Bold').fontSize(14).text("Questionnaire Response", 80, 310);
        doc.lineCap('butt')
           .moveTo(80,330)
           .lineTo(500, 330)
           .stroke();

        let shareId = req.params.shareId;
        let questionnaireId = null;

        let questionIndex = -1
        let sectionIndex = -1
        let scenarioIndex = -1


        let spacing = 340
        // actual page is 792 but setting it to 700 helps to prevent overflow problems
        let docHeight = 700


        Share.findOne({ shareId }, function (
            err,
            share
        ) {
            if (!err && share != null) {
                questionnaireId = share.questionnaireId;
                console.log("Q ID", questionnaireId);
                Questionnaire.findOne({ questionnaireId }, function (err, questionnaire) {
                    if (!err && questionnaire != null) {

                        questionnaire.sections.map((section) => {

                            sectionIndex++
                            scenarioIndex = -1
                            questionIndex = -1

                            if (spacing > docHeight) {
                                doc.addPage();
                                spacing = 80;
                            }
                            // title for each section
                            doc.font('Helvetica-Bold').fontSize(14).text(section.title, 80, spacing);
                            spacing = spacing + 30;
//                            console.log("1",section.title)

                            section.scenarios.map((scenario) => {
                                scenarioIndex++
                                questionIndex = -1

//                                console.log("2",scenario.description)
                                //description for each scenario
                                if (spacing > docHeight) {
                                    doc.addPage();
                                    spacing = 80;
                                }

                                doc.font('Helvetica-Bold').fontSize(12).text("Scenario: ", 80, spacing);
                                spacing = spacing + 20;

                                doc.font('Helvetica').fontSize(12).text(scenario.description, 80, spacing, {
                                                                                                             width: 420,
                                                                                                             align: 'justify'
                                                                                                           });
                                spacing = spacing + Math.ceil(doc.heightOfString(scenario.description) / 10) * 10 + 15;

                                scenario.questions.map((question) => {
                                    questionIndex++
                                    if (spacing > docHeight) {
                                        doc.addPage();
                                        spacing = 80;
                                    }

//                                    console.log("3",question)
//                                    console.log("answer:",questionnaireData[sectionIndex][scenarioIndex][questionIndex])

                                    // if the question is range type then the print out both value and supplementary value
                                    if (!question.isMCQ) {

                                        if (questionnaireData[sectionIndex][scenarioIndex][questionIndex].value == '') {
                                                doc.font('Helvetica-Bold')
                                                   .text("Answer: ", 80, spacing);
                                                doc.font('Helvetica')
                                                   .text(questionnaireData[sectionIndex][scenarioIndex][questionIndex].supplementaryValue, 280, spacing);

                                        }

                                        else {
                                               doc.font('Helvetica-Bold')
                                                  .text("Answer: ", 80, spacing)

                                               doc.font('Helvetica')
                                                  .text(questionnaireData[sectionIndex][scenarioIndex][questionIndex].value, 280, spacing)
                                        }

                                        spacing = spacing + 35;

                                        if (spacing > docHeight) {
                                            doc.addPage();
                                            spacing = 80;
                                        }
                                    }

                                    // mcq questions will have the question and answer printed on pdf
                                    else {
                                    doc.font('Helvetica-Bold')
                                    .text(question.description, 80, spacing, { width: 420,
                                                                               align: 'justify'});

                                    spacing = spacing + Math.ceil(doc.heightOfString(question.description) / 10) * 10 + 10;

                                    if (spacing > docHeight) {
                                        doc.addPage();
                                        spacing = 80;
                                    }

                                    doc.text("Answer: ", 80, spacing)

                                    doc.font('Helvetica')
                                    .text(questionnaireData[sectionIndex][scenarioIndex][questionIndex].value, 280, spacing);
                                    spacing = spacing + 35;
                                    }
                                })

                            })

                            // adds separation line
                            spacing = spacing + 10;
                            doc.lineCap('butt')
                            .moveTo(80,spacing)
                            .lineTo(500, spacing)
                            .stroke();
                            spacing = spacing + 20;

                                if (spacing > docHeight) {
                                    doc.addPage();
                                    spacing = 80;
                                }

                        })
                            doc.end();
                            // Creating the file to send.
                            const s = new Readable()
                            s.push(JSON.stringify(personalDetails))    // the string you want
                            s.push(JSON.stringify(questionnaireData))
                            s.push(null);     // indicates end-of-file basically - the end of the stream

                            // Used to display as a table in the email
                            const { jsonToTableHtmlString } = require('json-table-converter')

                            // Parameters for the email.
                            const mailOptions = {
                                from: "SSQ Paediatric",
                                to: clinicianEmail,
                                subject: "Questionnaire completed for " + personalDetails.name + ".",
                                html:
                                    '<div style="background-color: #151641; display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;color: #fff;padding: 20px;">\n' +
                                    '        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px"  viewBox="0 0 1138 341" enable-background="new 0 0 1138 341" xml:space="preserve">  <image id="image0" width="1138" height="341" x="0" y="0"\n' +
                                    '    href="data:image/png;base64,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" />\n' +
                                    "</svg>\n" +
                                    '        <h1 style="margin: 20px 0 0 0;font-weight: 100;color: #5AC0CC"> Paediatric SSQ - Questionnaire Submitted </h1>' +
                                    "    </div>" +
                                    '    <div style="padding: 2em;font-size: 20px;font-weight: 200;">' +
                                    "        <p>Hi Clinician,</p>" +
                                    "        <p>Questionnaire attached</p>" +
                                    "        <p>Thank you,</p>\n" +
                                    "        <p>" +
                                    "</p>\n" +
                                    "<div> <h2>Personal Details</h2>" + jsonToTableHtmlString(personalDetails,{}) + "</div>" +
                                    "<div> <h2>Questionnaire Data</h2>" + jsonToTableHtmlString(questionnaireData,{}) + "</div>" +
                                    "<div> <h2>Average score</h2>" + average_score + "</div>" +
                                    "<div> <h2>Section score</h2>" + section_score + "</div>" +
                                    "<div> <h2>Question number</h2>" + total_q + "</div>" +
                                    "    </div>",
                                attachments : [{   // stream as an attachment
                                    filename: 'results.pdf',
                                    content: doc
                                }],

                            };

                            // Used to send the email
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    res.send(false);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                    res.send(true);
                                }
                            });
                    }
                });
            }
        });

    //console.table(JSON.stringify(questionnaireData))




     //doc.fontSize(15)
     //.pipe(JSON.stringify(questionnaireData));



//    doc
//    .fontSize(25)
//    .text(JSON.stringify(questionnaireData), 100, 100)
//    .text("test here");


}

// Delete the share from our database.
const deleteShare = function (req, res) {
    const shareId = req.params.shareId;
    Share.deleteOne({ shareId: shareId }, function (
        err,
        result
    ) {
        console.log("Share Deleted:: " + shareId);
    });
};


// Send questionnaire link through email.
const sendInvitationEmail = function (req, res, createdShare) {
    let patientEmail = createdShare.patientEmail;
    let link = "http://localhost:3000/parent/" + createdShare.shareId + "" ;
    let message = "";
    if (createdShare.message != undefined){
        message = "Message from the clinician: " + createdShare.message + "";
    };

    // Used to create the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: require(path.join(__dirname, '..', 'config/keys')).GmailUserName,
            pass: require(path.join(__dirname, '..', 'config/keys')).GmailPassword,
        }
    });

    // Parameters for the email.
    const mailOptions = {
        from: 'SSQ Paediatric',
        to: patientEmail,
        subject: " You are invited to complete the following questionnaire.",
        html: '<div style="background-color: #151641; display: flex;flex-flow: column;align-items: center;justify-content: space-evenly;color: #fff;padding: 20px;">\n' +
            '        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px"  viewBox="0 0 1138 341" enable-background="new 0 0 1138 341" xml:space="preserve">  <image id="image0" width="1138" height="341" x="0" y="0"\n' +
            '    href="data:image/png;base64,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" />\n' +
            '</svg>\n' +
            '        <h1 style="margin: 20px 0 0 0;font-weight: 100;color: #5AC0CC"> Paediatric SSQ </h1>' +
            '    </div>' +
            '    <div style="padding: 2em;font-size: 20px;font-weight: 200;">' +
            '        <p>Hi,</p>' +
            '        <p>Please complete the following questionnaire.</p>' +
            '        <p style ="color: #151641;" >' + message +'</p>\n' +
            '        <p>Use the following link to complete the questionnaire: <a style="text-decoration: none;color: #ff5c4b;" href="' + link + '"  >link</a></p>\n' +
            '        <p>Thank you,</p>\n' +
            '        <p>' + 'Team SSQ' + '</p>\n' +
            '    </div>'
    };
    // Used to send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200);
        }
    });
};


module.exports.sendInvitationEmail = sendInvitationEmail;
module.exports.sendResultsEmail = sendResultsEmail;
module.exports.deleteShare = deleteShare;
module.exports.completeShare = completeShare;
module.exports.getShareDetails = getShareDetails;
module.exports.shareQuestionnaire = shareQuestionnaire;
