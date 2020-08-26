/**
 * ========================================
 * DEFINING SHARE API CALLS CONTROLLER
 * ========================================
 * @date created: 26 August 2020
 * @authors: Waqas
 *
 * The email_controller is used for handling all of email
 * requests.
 *
 */

const nodemailer = require('nodemailer');
const path = require("path");
const Readable = require('stream').Readable
const PDFDocument = require('pdfkit');

const mongoose = require("mongoose");

const Questionnaire = mongoose.model("questionnaire");

// Sending the results in an email.
const generateReport = function (questionnaireId, personalDetails, questionnaireData) {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {
        console.log("Enter Generate Report");
        //needs to merge
        const doc = new PDFDocument();

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
            .moveTo(80, 330)
            .lineTo(500, 330)
            .stroke();

        let questionIndex = -1
        let sectionIndex = -1
        let scenarioIndex = -1

        let spacing = 340
        // actual page is 792 but setting it to 700 helps to prevent overflow problems
        let docHeight = 700


        console.log("Enter Generate Report 2");

        Questionnaire.findOne({questionnaireId}, function (err, questionnaire) {
            if (!err) {
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
                    //                  console.log("1",section.title)

                    section.scenarios.map((scenario) => {
                        scenarioIndex++
                        questionIndex = -1

                        //                  console.log("2",scenario.description)
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

                            console.log("3", question)
                            console.log("answer:", questionnaireData[sectionIndex][scenarioIndex][questionIndex])

                            // if the question is range type then the print out both value and supplementary value
                            if (!question.isMCQ) {

                                if (questionnaireData[sectionIndex][scenarioIndex][questionIndex].value == '') {
                                    doc.font('Helvetica-Bold')
                                        .text("Answer: ", 80, spacing);
                                    doc.font('Helvetica')
                                        .text(questionnaireData[sectionIndex][scenarioIndex][questionIndex].supplementaryValue, 280, spacing);

                                } else {
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
                                    .text(question.description, 80, spacing, {
                                        width: 420,
                                        align: 'justify'
                                    });

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
                        .moveTo(80, spacing)
                        .lineTo(500, spacing)
                        .stroke();
                    spacing = spacing + 20;

                    if (spacing > docHeight) {
                        doc.addPage();
                        spacing = 80;
                    }
                });

                doc.end();
                // Creating the file to send.
                const s = new Readable()
                s.push(JSON.stringify(personalDetails))    // the string you want
                s.push(JSON.stringify(questionnaireData))
                s.push(null);     // indicates end-of-file basically - the end of the stream

                // Used to display as a table in the email
                const {jsonToTableHtmlString} = require('json-table-converter')

                resolve({
                    fileName: "Report.pdf",
                    content: doc,
                })
            } else {
                reject({
                    error: err,
                })
            }
        });
    });
}


module.exports.generateReport = generateReport;
