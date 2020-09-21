/**
 * ========================================
 * DEFINING REPORT CONTROLLER
 * ========================================
 * @date created: 26 August 2020
 * @authors: Waqas
 *
 * The report service is used for handling the generation
 * of reports from questionnaire responses.
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
    "Not Applicable.": 0
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
        spacing = 30;
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
    let lineSpacing = 40
    // actual page is 792 but setting it to 700 helps to prevent overflow problems
    let docHeight = Math.ceil(doc.page.height / 10) * 10 - 30;
    let tableMargin = 30
    let startMargin = 40
    let firstLine = 245
    let secondLine = 375
    let thirdLine = 505
    let fourthLine = 635

    let scenarioColumnWidth = 215;

    let questionColumnWidth = 130;
    let questionStartIndex = [firstLine, secondLine, thirdLine];

    let endMargin = 760
    let commentsColumnWidth = 215

    let nextRow = 0;

    resultToPrint.sections.forEach((section, sectionIndex) => {
        doc.font('Helvetica-Bold').text(section.title, startMargin, lineSpacing,
            {
                align: 'center'
            })
        lineSpacing += Math.ceil(doc.heightOfString(section.title) / 10) * 10;

        // lineSpacing += Math.ceil(doc.heightOfString(section.title, {
        //     width: scenarioColumnWidth - 10,
        //     align: 'justify'
        // }) / 10) * 10;

        // row separation line
        doc.lineCap('butt').moveTo(tableMargin, lineSpacing).lineTo(endMargin, lineSpacing).stroke();
        //prints out scenario description


        section.scenarios.map((scenario) => {
            doc.font('Helvetica-Bold').text(scenario.description, startMargin, lineSpacing + 10,
                {
                    width: scenarioColumnWidth - 20,
                    align: 'justify'
                })
            nextRow = Math.ceil(doc.heightOfString(scenario.description, {
                     width: scenarioColumnWidth - 20,
                     align: 'justify'
                 }) / 10) * 10;

            let index = 0;
            scenario.questions.map((question, questionIndex) => {

                // adds the question
                if (question.description !== undefined) {
                    doc.font('Helvetica-Bold').text(question.description, questionStartIndex[index] + 10, lineSpacing + 10,
                        {
                            width: questionColumnWidth - 20,
                            align: 'justify'
                        })
                    index += 1;
                }
                let tempSpace = Math.ceil(doc.heightOfString(question.description, {
                    width: questionColumnWidth - 20,
                    align: 'justify'
                }) / 10) * 10;

                // determine what is the line spacing
                if (tempSpace > nextRow) {
                    nextRow = tempSpace
                }
            });
            // if the questions have not been filled then add N/A for remaining spaces
            while (index < 3) {
                doc.font('Helvetica-Bold').text('N/A', questionStartIndex[index] + 10, lineSpacing + 10,
                    {
                        width: questionColumnWidth - 10,
                        align: 'justify'
                    })
                index += 1;
            }

            // adds comments column
            doc.font('Helvetica-Bold').text('Comments', fourthLine + 10, lineSpacing + 10,
                {
                    width: commentsColumnWidth - 10,
                    align: 'justify'
                })

            nextRow += lineSpacing + 10;

        });

        //line at the top of table
        doc.lineCap('butt').moveTo(tableMargin, tableMargin).lineTo(endMargin, tableMargin).stroke();
        //left border of table
        doc.lineCap('butt').moveTo(tableMargin, tableMargin).lineTo(tableMargin, nextRow).stroke();
        //right border of table
        doc.lineCap('butt').moveTo(endMargin, tableMargin).lineTo(endMargin, nextRow).stroke();
        //line at bottom of table
        //doc.lineCap('butt').moveTo(tableMargin, nextRow).lineTo(endMargin, nextRow).stroke();

        // first column separation of table
        doc.lineCap('butt').moveTo(firstLine, lineSpacing).lineTo(firstLine, nextRow).stroke();
        // second column separation of table
        doc.lineCap('butt').moveTo(secondLine, lineSpacing).lineTo(secondLine, nextRow).stroke();
        // third column separation of table
        doc.lineCap('butt').moveTo(thirdLine, lineSpacing).lineTo(thirdLine, nextRow).stroke();
        // fourth column separation of table
        doc.lineCap('butt').moveTo(fourthLine, lineSpacing).lineTo(fourthLine, nextRow).stroke();

        // add new page for each new section
        doc.addPage();
        //reset lineSpacing to original
        lineSpacing = 40
        //
        // spacing = addPage(doc, spacing, docHeight)
        // // Writing the title for each scenario.
        // doc.font('Helvetica-Bold').fontSize(14).text(section.title, startMargin, spacing);
        // doc.font('Helvetica').fontSize(12).text("Section average: " + section.score, midMargin, spacing);
        // spacing = spacing + 30;
        //
        // section.scenarios.map((scenario) => {
        //     spacing = addPage(doc, spacing, docHeight)
        //
        //     // Writing the description for each scenario.
        //     doc.font('Helvetica-Bold').fontSize(12).text("Scenario: ", startMargin, spacing);
        //     spacing = spacing + 20;
        //
        //     doc.font('Helvetica').fontSize(12).text(scenario.description, startMargin, spacing, {
        //         width: 420,
        //         align: 'justify'
        //     });
        //     spacing = spacing + Math.ceil(doc.heightOfString(scenario.description) / 10) * 10 + 15;
        //
        //     scenario.questions.map((question) => {
        //         spacing = addPage(doc, spacing, docHeight)
        //
        //         let questionAnswer = question.response;
        //         // If the question is range type then the print out both value and supplementary value.
        //         if (!question.isMCQ) {
        //             printRQAnswer(doc, questionAnswer, startMargin, midMargin, spacing)
        //
        //             spacing = spacing + 35;
        //             spacing = addPage(doc, spacing, docHeight)
        //         }
        //
        //         // MCQ questions will have the question and answer printed on pdf.
        //         else {
        //             doc.font('Helvetica-Bold')
        //                 .text(question.description, startMargin, spacing, {
        //                     width: 420,
        //                     align: 'justify'
        //                 });
        //
        //             spacing = spacing + Math.ceil(doc.heightOfString(question.description) / 10) * 10 + 10;
        //
        //             spacing = addPage(doc, spacing, docHeight)
        //
        //             printMCQAnswer(doc, questionAnswer, startMargin, midMargin, spacing)
        //             spacing = spacing + 35;
        //
        //         }
        //     })

    });

    // // Add a separation line.
    // spacing = spacing + 10;
    // doc.lineCap('butt')
    //     .moveTo(startMargin, spacing)
    //     .lineTo(500, spacing)
    //     .stroke();
    // spacing = spacing + 20;
    // spacing = addPage(doc, spacing, docHeight)


    // });

}

const getVisibleSections = (sections, visibilityInfoList) => {
    const filteredSections = sections.filter((section) => {
        const foundVisibilityInfo = visibilityInfoList.find(
            (visibilityInfo) => {
                return visibilityInfo.title === section.title;
            }
        );
        if (foundVisibilityInfo != undefined) {
            return foundVisibilityInfo.isVisible;
        } else {
            return null;
        }
    });
    return filteredSections;
};

// set the updates questionnaire sections.
const updateSections = (questionnaire, sectionVisibility) => {
    if (sectionVisibility != undefined) {
        questionnaire.sections = getVisibleSections(
            questionnaire.sections,
            sectionVisibility
        );
    }
};


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to compile the responses with the questionnaire
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getQuestionnaireResponseJoin = function (questionnaire, questionnaireData, sectionScores, sharedSections) {
    // MAKE A COPY OF THE ORIGINAL QUESTIONNAIRE
    updateSections(questionnaire, sharedSections);
    let result = questionnaire;
    let scenarioResponseList = [];

    let sectionIndex = 0;

    questionnaire.sections.forEach((section) => {
        // ADD SCORE TO THE SECTION

        result.sections[sectionIndex].score = sectionScores[sectionIndex];
        section.scenarios.forEach((scenario, scenarioIndex) => {
            let currentScenarioResponse = [];
            const numQuestions = scenario.questions.length;
            scenario.questions.forEach((question, questionIndex) => {
                // ADD RESPONSE TO THE QUESTION
                let valueToSet = questionnaireData[sectionIndex][scenarioIndex][questionIndex].value;

                if (!valueToSet) {
                    if (question.isMCQ) {
                        valueToSet = "Not Applicable."
                    } else {
                        valueToSet = questionnaireData[sectionIndex][scenarioIndex][questionIndex].supplementaryValue;
                    }
                }

                result.sections[sectionIndex].scenarios[scenarioIndex].questions[questionIndex].response =
                    valueToSet;

                currentScenarioResponse.push(valueToSet);
                if (questionIndex == numQuestions - 1) {
                    scenarioResponseList.push(currentScenarioResponse);
                }

            })
        });
        sectionIndex += 1;
    });
    return [result, scenarioResponseList]
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
const generateCSV = function (questionnaireData, personalDetails, scenarioResults) {
    const device_r = personalDetails.rightDeviceType === 'Other' ? personalDetails.rightDeviceTypeOther : personalDetails.rightDeviceType;
    const device_l = personalDetails.leftDeviceType === 'Other' ? personalDetails.leftDeviceTypeOther : personalDetails.leftDeviceType
    let toWrite = `Section,Item Number,Rating,Frequency,Importance,Listening Situation,` +
        `Completed By,Name,Date,Right Device Type, Left Device Type\n`
    let itemNumber = 1;
    questionnaireData.sections.forEach((section, sectionIndex) => {
        // ADD SCORE TO THE SECTION
        section.scenarios.forEach((scenario, scenarioIndex) => {
            let response = scenarioResults[itemNumber - 1]
            while (response.length < 3) {
                response.push("Not Applicable.")
            }
            let questionDescription = (scenario.description).replace(/,/g, "")
            toWrite += `${section.title},${itemNumber},${response[0]},${response[1]},${response[2]},` +
                `${questionDescription},${personalDetails.completedBy},${personalDetails.name},` +
                `${personalDetails.date},${device_r},${device_l}\n`
            itemNumber += 1;
        });
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
                const doc = new PDFDocument({layout: 'landscape'});
                let ts = getTimeStamp();
                // prints time stamp
                doc.font('Helvetica').fontSize(10).text(ts, 10, 10);
                // insert logo
                doc.image('assets/logo_complete.png', 670, 30, {width: 100})
                // prints heading for patient details
                doc.font('Helvetica-Bold').fontSize(14).text("Patient Details", 30, 80);
                // purple overlay for patient information
                doc.fillOpacity(0.1).rect(30, 100, 730, 120).fill('purple');
                doc.fillOpacity(1).fill('black');

                // prints out patient information headings
                doc.font('Helvetica-Bold').fontSize(12)
                    .text('Name', 50, 120)
                    .text('Right Device Type', 50, 170)
                    .text('Left Device Type', 350, 170)
                    .text('Date of Birth', 350, 120)
                    .text('Completed By', 600, 120);

                // prints out patient information
                const device_r = personalDetails.rightDeviceType === 'Other' ? personalDetails.rightDeviceTypeOther : personalDetails.rightDeviceType;
                const device_l = personalDetails.leftDeviceType === 'Other' ? personalDetails.leftDeviceTypeOther : personalDetails.leftDeviceType
                doc.font('Helvetica').fontSize(12)
                    .text(personalDetails.name, 50, 140)
                    .text(personalDetails.date, 350, 140)
                    .text(device_r, 50, 190)
                    .text(device_l, 350, 190)
                    .text(personalDetails.completedBy, 600, 140);

                // THIS LINE PRINTS THE QUESTIONNAIRE RESULT IN THE DOC FILE
                Share.findOne({shareId}, function (err, share
                ) {
                    let sharedSections = null;
                    if (!err && share != null) {
                        sharedSections = share.shareSection

                    }

                    const [resultToPrint, scenarioResults] = getQuestionnaireResponseJoin(questionnaire, questionnaireData, section_score, sharedSections);

                    const csvResult = generateCSV(resultToPrint, personalDetails, scenarioResults);

                    // prints out summary of section scores
                    doc.lineCap('butt').moveTo(30, 240).lineTo(doc.page.width - 30, 240).stroke();
                    doc.font('Helvetica-Bold').fontSize(14).text("Questionnaire Score Summary", 30, 260);
                    let lineSpacing = 290;
                    let margin = 0;
                    doc.font('Helvetica-Bold').fontSize(12).text("Questionnaire Average: ", 40, lineSpacing);
                    lineSpacing += 30;
                    resultToPrint.sections.forEach((section, sectionIndex) => {
                        doc.font('Helvetica-Bold').fontSize(12).text(section.title + " Average: ", 40, lineSpacing);
                        margin = Math.ceil(doc.widthOfString(section.title + " Average: ") / 10) * 10 + 60;
                        doc.font('Helvetica').text(scores.sectionScores[sectionIndex].toFixed(2), margin, lineSpacing);
                        lineSpacing += 30;
                        lineSpacing = addPage(doc, lineSpacing, doc.page.height);
                    })
                    doc.font('Helvetica').text(scores.averageScore, margin, 290);
                    doc.addPage()

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
