/**
 * ========================================
 * DEFINING REPORT CONTROLLER
 * ========================================
 * @date created: 26 August 2020
 * @authors: Waqas
 *
 * The email_controller is used for handling all of email
 * requests.
 *
 */

r');
const path = require("path");
const Readable = require('stream').Readable
const PDFDocument = require('pdfkit');

const mongoose = require("mongoose");

const Questionnaire = mongoose.model("questionnaire");


const getTimeStamp = function (){
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is print the results on the document
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const printQuestionnaireResults  = function(doc, resultToPrint) {

    let spacing = 340
    // actual page is 792 but setting it to 700 helps to prevent overflow problems
    let docHeight = 700
    resultToPrint.sections.map((section) => {
        if (spacing > docHeight) {
            doc.addPage();
            spacing = 80;
        }
        // title for each section
        doc.font('Helvetica-Bold').fontSize(14).text(section.title, 80, spacing);
        doc.font('Helvetica').fontSize(12).text("Section average: "+ section.score, 280, spacing);
        spacing = spacing + 30;
        //                  console.log("1",section.title)

        section.scenarios.map((scenario, scenarioIndex) => {

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
                if (spacing > docHeight) {
                    doc.addPage();
                    spacing = 80;
                }

                // console.log("3", question)
                // console.log("answer:", questionnaireData[sectionIndex][scenarioIndex][questionIndex])

                let questionAnswer = question.response;

                // if the question is range type then the print out both value and supplementary value
                if (!question.isMCQ) {

                    // console.log("questionAnswer.value",questionAnswer.value);
                    if ((questionAnswer.value === "" || questionAnswer.value === undefined)
                        && (questionAnswer.supplementaryValue === '' ||  questionAnswer.supplementaryValue === undefined)){

                        doc.font('Helvetica-Bold')
                            .text("Answer: ", 80, spacing)
                        questionAnswer.value = "Unanswered"
                        doc.font('Helvetica')
                            .text(questionAnswer.value, 280, spacing)

                    }else{
                        if (questionAnswer.supplementaryValue === '') {

                            doc.font('Helvetica-Bold')
                                .text("Answer: ", 80, spacing)

                            doc.font('Helvetica')
                                .text(questionAnswer.value, 280, spacing)

                        } else {

                            doc.font('Helvetica-Bold')
                                .text("Answer: ", 80, spacing);
                            doc.font('Helvetica')
                                .text(questionAnswer.supplementaryValue, 280, spacing);

                        }

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
                    if (questionAnswer.value === "" || questionAnswer.value === undefined ){
                        doc.font('Helvetica')
                            .text("Unanswered", 280, spacing);
                        spacing = spacing + 35;
                    }else{
                        doc.font('Helvetica')
                            .text(questionAnswer.value, 280, spacing);
                        spacing = spacing + 35;
                    }

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

}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to compile the responses with the questionnaire
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getQuestionnaireResponseJoin = function (questionnaire, questionnaireData, sectionScores) {
    // MAKE A COPY OF THE ORIGINAL QUESTIONNAIRE
    let result = questionnaire;
    questionnaire.sections.forEach((section, sectionIndex) => {
        // ADD SCORE TO THE SECTION
        result.sections[sectionIndex].score = sectionScores[sectionIndex]
        section.scenarios.forEach((scenario, scenarioIndex) => {
            scenario.questions.forEach((question, questionIndex) => {
                // ADD RESPONSE TO THE QUESTION
                result.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].response =
                    questionnaireData[sectionIndex][scenarioIndex][questionIndex];
            })
        });
    });
    return result
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to sort the questions by the importance
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sortByImportance = function (questionnaire) {
    o

}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used generate the pdf report.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const generateReport = function (questionnaireId, personalDetails, questionnaireData) {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {

        Questionnaire.findOne({questionnaireId}, function (err, questionnaire) {
            if (!err) {
                var total_score = 0;
                var section_score = new Array();
                var total_q = 0;
                var section_num = 0;

                for (var i = 0; i < questionnaireData.length; i++) {
                    var section_q = 0;
                    var score = 0;
                    for (var j = 0; j < questionnaireData[i].length; j++) {
                        for (var z = 0; z < questionnaireData[i][j].length; z++) {
                            console.log(questionnaireData[i][j][z])
                            if (!isNaN(questionnaireData[i][j][z].value)) {
                                if (questionnaireData[i][j][z].value != '') {
                                    score += questionnaireData[i][j][z].value;
                                }
                                section_q += 1;
                            }
                        }
                    }
                    if (score === 0 ){
                        section_score[section_num]="N/A";
                    }else{
                        section_score[section_num] = score / section_q;
                    }
                    total_score += score;
                    section_num += 1;
                    total_q += section_q;
                };
                let average_score = Math.round((total_score / total_q) * 100) / 100;

                // object created to pass through.
                let scores = {
                    averageScore: average_score,
                    sectionScores: section_score
                }

                const resultToPrint = getQuestionnaireResponseJoin(questionnaire, questionnaireData, section_score);

                console.log(" ");
                console.log(" ");
                console.log("resultToPrint", resultToPrint);
                console.log(" ");
                console.log(" ");
                // debugging
                //console.log("total_score:",total_score,"section_score:",section_score,"total_q:",total_q,"section_num:",section_num,"average_score:", average_score );

                //needs to merge
                //needs to merge
                const doc = new PDFDocument();
                let ts = getTimeStamp();
                doc.font('Helvetica').fontSize(10).text(ts, 10, 10);

                doc.image('assets/logo_complete.png', 400, 30, {width: 100})

                doc.font('Helvetica-Bold').fontSize(14).text("Patient Details", 80, 80);

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
                doc.font('Helvetica').fontSize(12).text("Questionnaire average: " + scores.averageScore, 280, 310);

                doc.lineCap('butt')
                    .moveTo(80, 330)
                    .lineTo(500, 330)
                    .stroke();


                // -------  TO DO  --------
                // MAKE THIS BETTER
                const sortedResults = sortByImportance(resultToPrint);

                printQuestionnaireResults(doc, sortedResults)


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
