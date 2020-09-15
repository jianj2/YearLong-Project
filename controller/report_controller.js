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

// Import Libraries
const Readable = require('stream').Readable
const PDFDocument = require('pdfkit');
const mongoose = require("mongoose");
const Questionnaire = mongoose.model("questionnaire");
const Share = mongoose.model("share");
const fs = require('fs');

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const HELPER_IMPORTANCE = {
    "Very important": 4,
    "Important": 3,
    "Only a little bit important": 2,
    "Not important": 1,
}
const getTimeStamp = function () {
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
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
}

const addPage = function (doc, spacing, docHeight) {
    if (spacing > docHeight) {
        doc.addPage();
        spacing = 80;
    }
    return spacing;
}

//print MCQ
//print range
const printRQAnswer = function (doc, questionAnswer, startMargin, midMargin, spacing) {
    doc.font('Helvetica-Bold')
        .text("Answer: ", startMargin, spacing)
    if ((questionAnswer === "" || questionAnswer === undefined)) {
        questionAnswer = "Unanswered"
        doc.font('Helvetica')
            .text(questionAnswer.value, midMargin, spacing)
    } else {
        doc.font('Helvetica')
            .text(questionAnswer, midMargin, spacing);
    }
}

const printMCQAnswer = function (doc, questionAnswer, startMargin, midMargin, spacing) {
    doc.text("Answer: ", startMargin, spacing)
    if (questionAnswer === "" || questionAnswer === undefined) {
        doc.font('Helvetica')
            .text("Unanswered", midMargin, spacing);
    } else {
        doc.font('Helvetica')
            .text(questionAnswer, midMargin, spacing);
    }
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to print the results on the document
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const printQuestionnaireResults = function (doc, resultToPrint, sharedSection) {
    // initial document spacing after patient information
    let spacing = 340
    // actual page is 792 but setting it to 700 helps to prevent overflow problems
    let docHeight = 700
    let startMargin = 80
    let midMargin = 280

    resultToPrint.sections.forEach((section, sectionIndex) => {

        if (sharedSection === null || sharedSection[sectionIndex].isVisible) {
            spacing = addPage(doc, spacing, docHeight)
            // Writing the title for each scenario.
            doc.font('Helvetica-Bold').fontSize(14).text(section.title, startMargin, spacing);
            doc.font('Helvetica').fontSize(12).text("Section average: " + section.score, midMargin, spacing);
            spacing = spacing + 30;

            section.scenarios.map((scenario) => {
                spacing = addPage(doc, spacing, docHeight)

                // Writing the description for each scenario.
                doc.font('Helvetica-Bold').fontSize(12).text("Scenario: ", startMargin, spacing);
                spacing = spacing + 20;

                doc.font('Helvetica').fontSize(12).text(scenario.description, startMargin, spacing, {
                    width: 420,
                    align: 'justify'
                });
                spacing = spacing + Math.ceil(doc.heightOfString(scenario.description) / 10) * 10 + 15;

                scenario.questions.map((question) => {
                    spacing = addPage(doc, spacing, docHeight)

                    let questionAnswer = question.response;
                    // If the question is range type then the print out both value and supplementary value.
                    if (!question.isMCQ) {
                        printRQAnswer(doc, questionAnswer, startMargin, midMargin, spacing)

                        spacing = spacing + 35;
                        spacing = addPage(doc, spacing, docHeight)
                    }

                    // MCQ questions will have the question and answer printed on pdf.
                    else {
                        doc.font('Helvetica-Bold')
                            .text(question.description, startMargin, spacing, {
                                width: 420,
                                align: 'justify'
                            });

                        spacing = spacing + Math.ceil(doc.heightOfString(question.description) / 10) * 10 + 10;

                        spacing = addPage(doc, spacing, docHeight)

                        printMCQAnswer(doc, questionAnswer, startMargin, midMargin, spacing)
                        spacing = spacing + 35;

                    }
                })

            })

            // Add a separation line.
            spacing = spacing + 10;
            doc.lineCap('butt')
                .moveTo(startMargin, spacing)
                .lineTo(500, spacing)
                .stroke();
            spacing = spacing + 20;
            spacing = addPage(doc, spacing, docHeight)
        }

    });

}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to compile the responses with the questionnaire
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getQuestionnaireResponseJoin = function (questionnaire, questionnaireData, sectionScores, sharedSections) {
    // MAKE A COPY OF THE ORIGINAL QUESTIONNAIRE
    let result = questionnaire;
    let realSectionIndex = 0

    questionnaire.sections.forEach((section, sectionIndex) => {
        // ADD SCORE TO THE SECTION

        if (sharedSections === null || sharedSections[sectionIndex].isVisible) {
            result.sections[sectionIndex].score = sectionScores[sectionIndex]

            section.scenarios.forEach((scenario, scenarioIndex) => {
                scenario.questions.forEach((question, questionIndex) => {
                    // ADD RESPONSE TO THE QUESTION
                    let valueToSet = questionnaireData[realSectionIndex][scenarioIndex][questionIndex].value;

                    if (!valueToSet) {
                        if (question.isMCQ) {
                            valueToSet = "Not Applicable."
                        } else {
                            valueToSet = questionnaireData[realSectionIndex][scenarioIndex][questionIndex].supplementaryValue;
                        }

                    }
                    result.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].response =
                        valueToSet;
                })
            });
            realSectionIndex++;
        }
    });
    return result
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to sort the questions by the importance
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sortByImportance = function (response) {
    let sortedResult = response;

    sortedResult.sections.forEach(section => {
        section.scenarios.sort((a, b) =>
            HELPER_IMPORTANCE[b.questions[2].response.value] - HELPER_IMPORTANCE[a.questions[2].response.value]
        )
    })

    return sortedResult;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to calculate both the average and section scores
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const calculateScore = function (questionnaireData, calculateAverage, section_score) {
    let total_score = 0;
    let total_q = 0;
    let section_num = 0;

    for (let i = 0; i < questionnaireData.length; i++) {
        let section_q = 0;
        let score = 0;
        for (let j = 0; j < questionnaireData[i].length; j++) {
            for (let z = 0; z < questionnaireData[i][j].length; z++) {
                if (!isNaN(questionnaireData[i][j][z].value)) {
                    if (questionnaireData[i][j][z].value !== '') {
                        score += questionnaireData[i][j][z].value;
                    }
                    section_q += 1;
                }
            }
        }

        if (score === 0) {
            section_score[section_num] = "N/A";
        } else {
            section_score[section_num] = Math.round((score / section_q) * 100) / 100;
        }

        total_score += score;
        section_num += 1;
        total_q += section_q;
    }

    if (calculateAverage) {
        return Math.round((total_score / total_q) * 100) / 100;
    } else {
        return section_score
    }
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used generate the csv report.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const createcsv = function (questionnaireData, personalDetails, sharedSections) {
    let toWrite = `name,date,right_device_type,left_device_type,completed_by,` +
        `section,question,response\n`
    let realSectionIndex = 0;
    questionnaireData.sections.forEach((section, sectionIndex) => {
        // ADD SCORE TO THE SECTION
        //questionnaireData[realSectionIndex][scenarioIndex][questionIndex].value;
        if (sharedSections === null || sharedSections[sectionIndex].isVisible) {
            section.scenarios.forEach((scenario , scenarioIndex)=> {
                scenario.questions.forEach(question => {
                    let questionDescription = (scenario.description).replace(/,/g, "")
                    toWrite += `${personalDetails.name},${personalDetails.date},${personalDetails.rightDeviceType},${personalDetails.leftDeviceType},${personalDetails.completedBy},` +
                        `${section.title},${questionDescription},${question.response}\n`
                })
            });
            realSectionIndex++;
        }
    });
    return Buffer.from(toWrite, 'utf8')
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used generate the pdf report.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const generateAttachments = function (questionnaireId, personalDetails, questionnaireData, shareId) {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {

        Questionnaire.findOne({questionnaireId}, function (err, questionnaire) {
            if (!err) {
                let section_score = [];


                section_score = calculateScore(questionnaire, false, section_score)
                let average_score = calculateScore(questionnaireData, true, section_score);

                // object created to pass through
                let scores = {
                    averageScore: average_score,
                    sectionScores: section_score
                }

                //creating pdf document
                const doc = new PDFDocument();
                let ts = getTimeStamp();
                // prints time stamp
                doc.font('Helvetica').fontSize(10).text(ts, 10, 10);
                // insert logo
                doc.image('assets/logo_complete.png', 400, 30, {width: 100})
                // prints heading for patient details
                doc.font('Helvetica-Bold').fontSize(14).text("Patient Details", 80, 80);

                // purple overlay for patient information
                doc.fillOpacity(0.1).rect(80, 100, 420, 180).fill('purple');
                doc.fillOpacity(1).fill('black');

                // prints out patient information headings
                doc.font('Helvetica-Bold').fontSize(12)
                    .text('Patient Name', 100, 120)
                    .text('Right Device Type', 100, 170)
                    .text('Left Device Type', 100, 220)
                    .text('Date of Birth', 300, 120)
                    .text('Completed By', 300, 170);

                // prints out patient information
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

                // THIS LINE PRINTS THE QUESTIONNAIRE RESULT IN THE DOC FILE
                Share.findOne({shareId}, function (err, share
                ) {
                    let sharedSections = null;
                    if (!err && share != null) {
                        sharedSections = share.shareSection

                    }

                    const resultToPrint = getQuestionnaireResponseJoin(questionnaire, questionnaireData, section_score, sharedSections);

                    const csvResult = createcsv(resultToPrint, personalDetails, sharedSections);

                    // -------  TO DO  --------
                    // MAKE THIS BETTER
                    const sortedResults = sortByImportance(resultToPrint)

                    printQuestionnaireResults(doc, sortedResults, sharedSections)
                    // CLOSE THE DOCUMENT,
                    doc.end();

                    // CREATE THE PDF
                    const s = new Readable()
                    s.push(JSON.stringify(personalDetails))    // the string you want
                    s.push(JSON.stringify(questionnaireData))
                    s.push(null);     // indicates end-of-file basically - the end of the stream

                    // Used to display as a table in the email
                    const {jsonToTableHtmlString} = require('json-table-converter')

                    resolve([{
                        filename: "Report.pdf",
                        content: doc,
                    }, {
                        filename: "Report.csv",
                        content: csvResult,
                    }])
                });
            } else {
                reject({
                    error: err,
                })
            }
        });
    });
}


module.exports.generateAttachments = generateAttachments;
