////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const Readable = require('stream').Readable
const PDFDocument = require('pdfkit');
const mongoose = require("mongoose");
const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");
const Share = mongoose.model("share");

/**
 * =============================================================================
 * DEFINING REPORT CONTROLLER
 * =============================================================================
 * @date created: 26 August 2020
 * @authors: Waqas Rehmani
 *
 * The report service is used for handling the generation
 * of reports from questionnaire responses.
 *
 */

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// HELPERS
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const HELPER_IMPORTANCE = {
    "Very important": 4,
    "Important": 3,
    "Only a little bit important": 2,
    "Not important": 1,
    "Not Applicable.": 0
}
const HELPER_SORT = {
    "PERFORMANCE": "PERFORMANCE",
    "IMPORTANCE": "IMPORTANCE",
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

const addPage = function (doc, spacing, docHeight, paragraphHeight) {
    if (paragraphHeight > 0 && (spacing + paragraphHeight) > docHeight) {
        doc.addPage();
        // prints time stamp
        doc.font('Helvetica').fontSize(10).text(getTimeStamp(), 10, 10);
        // insert logo
        doc.image('assets/logo_complete.png', 450, 30, {width: 100})
        spacing = 100;
    } else if (spacing >= docHeight) {
        doc.addPage();
        // prints time stamp
        doc.font('Helvetica').fontSize(10).text(getTimeStamp(), 10, 10);
        // insert logo
        doc.image('assets/logo_complete.png', 450, 30, {width: 100})
        spacing = 100;
    }
    return spacing;
}

//print MCQ
//print range
const printRQAnswer = function (doc, questionAnswer, startMargin, midMargin, spacing) {
    doc.font('Helvetica-Bold').fontSize(12).text("Answer: ", startMargin, spacing)
    if ((questionAnswer === "" || questionAnswer === undefined)) {
        questionAnswer = "Unanswered"
        doc.font('Helvetica')
            .text(questionAnswer.value, midMargin, spacing)
    } else {
        scoreColour(doc, questionAnswer)
        doc.font('Helvetica')
            .text(questionAnswer, midMargin, spacing);
        doc.fillColor('black');
    }
}

const printMCQAnswer = function (doc, questionAnswer, startMargin, midMargin, spacing) {
    doc.font('Helvetica-Bold').fontSize(12).text("Answer: ", startMargin, spacing)
    if (questionAnswer === "" || questionAnswer === undefined) {
        doc.font('Helvetica')
            .text("Unanswered", midMargin, spacing);
    } else {
        doc.font('Helvetica')
            .text(questionAnswer, midMargin, spacing);
    }
}

const scoreColour = function (doc, value) {
    if (value < 4.0) {
        doc.fillColor('red')
    } else if (value >= 4.0 && value < 7.0) {
        doc.fillColor('orange')
    } else if (value >= 7.0 && value <= 10.0) {
        doc.fillColor('green')
    }
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to print the results on the document
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const printCustomQuestionnaireResults = function (doc, resultToPrint, startSpacing, comments) {
    // initial document spacing after patient information
    let docHeight = Math.ceil(doc.page.height / 10) * 10 - 100;
    let rightMargin = 40
    let startMargin = 30
    let spacing = startSpacing;
    let answerMargin = Math.ceil((doc.widthOfString("Answer: ") + rightMargin) / 10) * 10 + 5;
    let paragraphWidth = 465;
    let scenarioParagraphWidth = 440;

    resultToPrint.sections.forEach((section, sectionIndex) => {
        spacing = addPage(doc, spacing, docHeight)
        // Writing the title for each scenario.
        doc.font('Helvetica-Bold').fontSize(14).text(section.title, startMargin, spacing);
        // doc.font('Helvetica').fontSize(12).text("Section average: " + section.score, midMargin, spacing);
        spacing = spacing + 30;
        let count = 1;
        section.scenarios.map((scenario, scenarioIndex) => {
            spacing = addPage(doc, spacing, docHeight, Math.ceil(doc.heightOfString(scenario.description, {width: paragraphWidth}) / 10) * 10 + 15)
            // Writing the description for each scenario.
            let scenarioString = count + ". Listening Situation: "


            doc.font('Helvetica-Bold').fontSize(12).text(scenarioString, rightMargin, spacing);
            //spacing = spacing + 20;
            let margin = Math.ceil((doc.widthOfString(scenarioString) + rightMargin) / 10) * 10 + 5;

            doc.font('Helvetica').fontSize(12).text(scenario.description, margin, spacing, {
                width: scenarioParagraphWidth,
                align: 'justify'
            });

            // adds purple overlay on top of scenario
            doc.fillOpacity(0.1).rect(30, spacing - 10, 550, doc.heightOfString(scenario.description, {width: scenarioParagraphWidth}) + 15).fill('purple');
            doc.fillOpacity(1).fill('black');

            spacing = spacing + Math.ceil(doc.heightOfString(scenario.description, {width: scenarioParagraphWidth}) / 10) * 10 + 15;

            scenario.questions.map((question) => {
                spacing = addPage(doc, spacing, docHeight)

                let questionAnswer = question.response;
                // If the question is range type then the print out both value and supplementary value.
                if (!question.isMCQ) {
                    printRQAnswer(doc, questionAnswer, rightMargin, answerMargin, spacing)

                    spacing = spacing + 35;
                    spacing = addPage(doc, spacing, docHeight)
                }

                // MCQ questions will have the question and answer printed on pdf.
                else {
                    spacing = addPage(doc, spacing, docHeight, Math.ceil(doc.heightOfString(question.description, {width: paragraphWidth}) / 10) * 10 + 10)
                    doc.font('Helvetica-Bold')
                        .text(question.description, rightMargin, spacing, {
                            width: paragraphWidth,
                            align: 'justify'
                        });

                    spacing = spacing + Math.ceil(doc.heightOfString(question.description, {width: paragraphWidth}) / 10) * 10 + 10;
                    spacing = addPage(doc, spacing, docHeight)

                    printMCQAnswer(doc, questionAnswer, rightMargin, answerMargin, spacing)
                    spacing = spacing + 35;
                }
                spacing = addPage(doc, spacing, docHeight)

            });
            // Add a comment
            if (comments[sectionIndex][scenarioIndex] !== null && comments[sectionIndex][scenarioIndex] !== "") {
                let comment = comments[sectionIndex][scenarioIndex]
                spacing = addPage(doc, spacing, docHeight, Math.ceil(doc.heightOfString(comment, {width: paragraphWidth-25}) / 10) * 10 + 10)
                doc.font('Helvetica-Bold').fontSize(12)
                    .text('Comments: ', rightMargin, spacing);
                doc.font('Helvetica').text(comment, answerMargin, spacing, {
                    width: paragraphWidth - 25,
                    align: 'justify'
                })
                spacing = spacing + Math.ceil(doc.heightOfString(comment, {width: paragraphWidth-25}) / 10) * 10 + 15;
                spacing = addPage(doc, spacing, docHeight)
            }
            count += 1;


        });
        // Add a separation line.
        spacing = spacing + 10;
        doc.lineCap('butt').moveTo(startMargin, spacing).lineTo(doc.page.width - 30, spacing).stroke();
        spacing = spacing + 20;
        spacing = addPage(doc, spacing, docHeight)
    });

}

const printStandardQuestionnaireResults = function (doc, resultToPrint, startSpacing, comments) {
    // initial document spacing after patient information
    let docHeight = Math.ceil(doc.page.height / 10) * 10 - 100;
    let rightMargin = 40
    let startMargin = 30
    let spacing = startSpacing;
    let paragraphWidth = 465;
    let scenarioParagraphWidth = 390;
    let questionHeading = ['Performance Rating', 'Frequency of Occurrence', 'Importance']
    let answerMargin = Math.ceil((doc.widthOfString("Frequency of Occurrence: ") + rightMargin) / 10) * 10 + 5;
    let frequencyKey = ['Very often (4 or more times in a week)',
        'Often (1 to 3 times in a week)',
        'Not often (1 to 2 times in a month)',
        'Almost Never']
    let otherOptions = ['Would Not Hear It:', 'Do Not Know:', 'Not Applicable:']
    let optionExplanation = ['The listener cannot hear the voice or sound they need to understand or identify in the listening situation described',
        'An accurate rating of performance cannot be provided',
        'The listener does not experience the listening situation described']
    let importanceKey = ['Very Important', 'Important', 'Only a bit Important', 'Not Important']

    resultToPrint.sections.forEach((section, sectionIndex) => {
        spacing = addPage(doc, spacing, docHeight)
        // Writing the title for each scenario.
        doc.font('Helvetica-Bold').fontSize(14).text(section.title, startMargin, spacing);
        // doc.font('Helvetica').fontSize(12).text("Section average: " + section.score, midMargin, spacing);
        spacing = spacing + 35;
        let count = 1
        section.scenarios.forEach((scenario, scenarioIndex) => {
            spacing = addPage(doc, spacing, docHeight)
            // Writing the description for each scenario.
            let scenarioString = count + ". Listening Situation: "
            doc.font('Helvetica-Bold').fontSize(12).text(scenarioString, rightMargin, spacing);


            let scenarioMargin = Math.ceil((doc.widthOfString(scenarioString) + rightMargin) / 10) * 10 + 5;

            doc.font('Helvetica').fontSize(12).text(scenario.description, scenarioMargin, spacing, {
                width: scenarioParagraphWidth,
                align: 'justify'
            });

            // adds purple overlay on top of scenario
            doc.fillOpacity(0.1).rect(30, spacing - 10, 550, doc.heightOfString(scenario.description, {width: scenarioParagraphWidth}) + 15).fill('purple');
            doc.fillOpacity(1).fill('black');
            spacing = spacing + Math.ceil(doc.heightOfString(scenario.description, {width: scenarioParagraphWidth}) / 10) * 10 + 15;

            scenario.questions.map((question, questionIndex) => {
                spacing = addPage(doc, spacing, docHeight)
                let questionAnswer = question.response;
                doc.font('Helvetica-Bold').fontSize(12).text(questionHeading[questionIndex] + ": ", rightMargin, spacing)
                scoreColour(doc, questionAnswer)
                doc.font('Helvetica').fontSize(12).text(questionAnswer, answerMargin, spacing, {
                    width: paragraphWidth,
                    align: 'justify'
                })
                doc.fillColor('black')
                spacing = spacing + Math.ceil(doc.heightOfString(questionAnswer, {width: paragraphWidth}) / 10) * 10 + 20;
                spacing = addPage(doc, spacing, docHeight)
            });

            // Add a comment
            if (comments[sectionIndex][scenarioIndex] !== null && comments[sectionIndex][scenarioIndex] !== "") {
                let comment = comments[sectionIndex][scenarioIndex]
                spacing = addPage(doc, spacing, docHeight, Math.ceil(doc.heightOfString(comment, {width: paragraphWidth-25}) / 10) * 10 + 10)
                doc.font('Helvetica-Bold').fontSize(12)
                    .text('Comments: ', rightMargin, spacing);
                doc.font('Helvetica').text(comment, answerMargin, spacing, {
                    width: paragraphWidth-25,
                    align: 'justify'
                })
                spacing = spacing + Math.ceil(doc.heightOfString(comment, {width: paragraphWidth-25}) / 10) * 10 + 15;
                spacing = addPage(doc, spacing, docHeight)
            }
            count += 1;

        });
        // Add a separation line.
        doc.lineCap('butt').moveTo(startMargin, spacing).lineTo(doc.page.width - 30, spacing).stroke();
        spacing = spacing + 20;
        spacing = addPage(doc, spacing, docHeight)
    });
    // scale key
    doc.font('Helvetica-Bold').fontSize(14).text("Definitions", startMargin, spacing);
    spacing = spacing + 20;
    doc.font('Helvetica-Bold').fontSize(12).text("Performance ratings were chosen using this ruler:", rightMargin, spacing)

    spacing = spacing + 20;
    spacing = addPage(doc, spacing, docHeight)
    // slider image
    doc.image('assets/slider.png', rightMargin, spacing, {width: 540, height: 50})
    spacing = spacing + 70;
    spacing = addPage(doc, spacing, docHeight)
    doc.font('Helvetica-Bold').fontSize(12).text("If a performance rating was not provided, one of these alternative responses was selected:", rightMargin, spacing)
    spacing = spacing + 30;
    //other options for slider
    otherOptions.map((option, index) => {
        doc.font('Helvetica-Bold').fontSize(12)
        doc.list([option], rightMargin, spacing)
        doc.font('Helvetica-Oblique').fontSize(12)
        doc.text(optionExplanation[index], 170, spacing, {
            width: 410,
            align: 'justify'
        });
        spacing = spacing + doc.heightOfString(optionExplanation[index]) + 10;
        spacing = addPage(doc, spacing, docHeight)
    })
    spacing = spacing + 10;
    spacing = addPage(doc, spacing, docHeight)

    //frequency key
    doc.font('Helvetica-Bold').fontSize(14).text("Frequency of occurrence: How often the type of listening situation occurs", startMargin, spacing);
    spacing = spacing + 25;
    spacing = addPage(doc, spacing, docHeight)
    doc.font('Helvetica').fontSize(12)
    frequencyKey.map((frequency) => {
        doc.list([frequency], rightMargin, spacing)
        spacing = spacing + 20;
        spacing = addPage(doc, spacing, docHeight)
    })
    spacing = spacing + 10;
    spacing = addPage(doc, spacing, docHeight)

    //importance key
    doc.font('Helvetica-Bold').fontSize(14).text("Importance: How important it is to have, or to develop, the listening skills required for the type of situation", startMargin, spacing);
    spacing = spacing + 40;
    doc.font('Helvetica').fontSize(12)
    importanceKey.map((importance) => {
        doc.list([importance], rightMargin, spacing)
        spacing = spacing + 20;
    })


}

const getVisibleSections = (sections, visibilityInfoList) => {
    const filteredSections = sections.filter((section) => {
        const foundVisibilityInfo = visibilityInfoList.find(
            (visibilityInfo) => {
                return visibilityInfo.title === section.title;
            }
        );
        if (foundVisibilityInfo !== undefined) {
            return foundVisibilityInfo.isVisible;
        } else {
            return null;
        }
    });
    return filteredSections;
};

// set the updates questionnaire sections.
const updateSections = (questionnaire, sectionVisibility) => {
    if (sectionVisibility) {
        questionnaire.sections = getVisibleSections(
            questionnaire.sections,
            sectionVisibility
        );
    }
};


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to compile the responses with the questionnaire
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
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
                if (questionIndex === numQuestions - 1) {
                    scenarioResponseList.push(currentScenarioResponse);
                }

            })
        });
        sectionIndex += 1;
    });
    return [result, scenarioResponseList]
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to sort the questions by the importance
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sortByImportance = function (response) {
    let sortedResult = response;

    sortedResult.sections.forEach(section => {
        section.scenarios.sort((a, b) =>
            HELPER_IMPORTANCE[b.questions[2].response] - HELPER_IMPORTANCE[a.questions[2].response]
        )
    })

    return sortedResult;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to sort the questions by the importance
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sortByPerformance = function (response) {
    let sortedResult = response;

    sortedResult.sections.forEach(section => {
        section.scenarios.sort((a, b) =>
            b.questions[0].response - a.questions[0].response
        )
    })

    return sortedResult;
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Helper function to obtain scores for speech sub-scales
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const speechSection = function (speechScenarios, subScaleScore) {
    // counter and score variables to
    // store the total score and total count
    let scoreSpQ = 0;
    let spQCount = 0;
    let scoreSpN = 0;
    let spNCount = 0;
    let scoreSpSp = 0;
    let spSpCount = 0;
    let scoreSpStrm = 0;
    let spStrmCount = 0;

    // The counting starts from zero
    for (let j = 0; j < speechScenarios.length; j++) {
        for (let z = 0; z < speechScenarios[j].length; z++) {
            if (!isNaN(speechScenarios[j][z].value)) {
                if (speechScenarios[j][z].value !== '') {

                    // switch case combination to calculate the average score
                    // of sub-scale SpQ, SpN, SpSp, SpStrm
                    switch (j) {
                        // For SpQ A2 A3
                        case 1:
                        case 2:
                            scoreSpQ += speechScenarios[j][z].value
                            spQCount += 1;
                            break;
                        // For SpN A1 A4 A5 A6
                        case 0:
                        case 3:
                        case 4:
                        case 5:
                            scoreSpN += speechScenarios[j][z].value
                            spNCount += 1;
                            break;
                        // For SpSp A7 A8
                        case 6:
                        case 7:
                            scoreSpSp += speechScenarios[j][z].value
                            spSpCount += 1;
                            break;
                        // For SpStrm A9
                        case 8:
                            scoreSpStrm += speechScenarios[j][z].value
                            spStrmCount += 1;
                            break;
                        default:
                            console.log(`speechScenario: ${j} is not included in any subscale`)
                    }
                }
            }
        }
    }

    // Averaging the score for each subscale
    subScaleScore.Speech.SpQ = (!isNaN(scoreSpQ / spQCount)) ? (scoreSpQ / spQCount) : "N/A"
    subScaleScore.Speech.SpN = (!isNaN(scoreSpN / spNCount)) ? (scoreSpN / spNCount) : "N/A"
    subScaleScore.Speech.SpSp = (!isNaN(scoreSpSp / spSpCount)) ? (scoreSpSp / spSpCount) : "N/A"
    subScaleScore.Speech.SpStrm = (!isNaN(scoreSpStrm / spStrmCount)) ? (scoreSpStrm / spStrmCount) : "N/A"

    return subScaleScore;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Helper function to obtain scores for spatial sub-scales
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const spatialSection = function (spatialScenarios, subScaleScore) {
    // counter and score variables to
    // store the total score and total count
    let scoreLocaliz = 0;
    let localizCount = 0;
    let scoreDist = 0;
    let distCount = 0;

    // The counting starts from zero
    for (let j = 0; j < spatialScenarios.length; j++) {
        for (let z = 0; z < spatialScenarios[j].length; z++) {
            if (!isNaN(spatialScenarios[j][z].value)) {
                if (spatialScenarios[j][z].value !== '') {

                    // switch case combination to calculate the average score
                    // of sub-scale Localiz, Dist/Move
                    switch (j) {
                        // For Localiz B1 B2 B3 B4 B5
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            scoreLocaliz += spatialScenarios[j][z].value
                            localizCount += 1;
                            break;
                        // For Dist/Move B6 B7 B8 B9 B10 B11 B12
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            scoreDist += spatialScenarios[j][z].value
                            distCount += 1;
                            break;
                        default:
                            console.log(`spatialScenario: ${j} is not included in any subscale`)
                    }
                }
            }
        }
    }

    // Averaging the score for each subscale
    subScaleScore.Spatial.Localiz = (!isNaN(scoreLocaliz / localizCount)) ? (scoreLocaliz / localizCount) : "N/A"
    subScaleScore.Spatial.Dist = (!isNaN(scoreDist / distCount)) ? (scoreDist / distCount) : "N/A"

    return subScaleScore;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Helper function to obtain scores for qualities sub-scales
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const qualitiesSection = function (qualitiesScenarios, subScaleScore) {
    // counter and score variables to
    // store the total score and total count
    let scoreSegreg = 0;
    let segregCount = 0;
    let scoreIDSound = 0;
    let idSoundCount = 0;
    let scoreListEff = 0;
    let listEffCount = 0;

    // The counting starts from zero
    for (let j = 0; j < qualitiesScenarios.length; j++) {
        for (let z = 0; z < qualitiesScenarios[j].length; z++) {
            if (!isNaN(qualitiesScenarios[j][z].value)) {
                if (qualitiesScenarios[j][z].value !== '') {

                    // switch case combination to calculate the average score
                    // of sub-scale Segreg, ID Sound, ListEff
                    switch (j) {
                        // Segreg C1 C2
                        case 0:
                        case 1:
                            scoreSegreg += qualitiesScenarios[j][z].value
                            segregCount += 1;
                            break;
                        // ID Sound C3 C4 C5 C6
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            scoreIDSound += qualitiesScenarios[j][z].value
                            idSoundCount += 1;
                            break;
                        // ListEff C7 C9 C10
                        case 6:
                        case 8:
                        case 9:
                            scoreListEff += qualitiesScenarios[j][z].value
                            listEffCount += 1;
                            break;
                        default:
                            console.log(`qualitiesScenario: ${j} is not included in any subscale`)
                    }
                }
            }
        }
    }

    // Averaging the score for each subscale
    subScaleScore.Qualities.Segreg = (!isNaN(scoreSegreg / segregCount)) ? (scoreSegreg / segregCount) : "N/A"
    subScaleScore.Qualities.IDSound = (!isNaN(scoreIDSound / idSoundCount)) ? (scoreIDSound / idSoundCount) : "N/A"
    subScaleScore.Qualities.ListEff = (!isNaN(scoreListEff / listEffCount)) ? (scoreListEff / listEffCount) : "N/A"

    return subScaleScore;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to calculate the average score for each sub-scale 
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const calculateSubScaleScore = function (questionnaireData, subScaleScore) {
    for (let i = 0; i < questionnaireData.length; i++) {
        switch (i) {
            case 0:
                subScaleScore = speechSection(questionnaireData[i], subScaleScore)
                break;
            case 1:
                subScaleScore = spatialSection(questionnaireData[i], subScaleScore)
                break;
            case 2:
                subScaleScore = qualitiesSection(questionnaireData[i], subScaleScore)
                break;
            default:
                console.log(`Section does not exist`)
        }
    }

    return subScaleScore
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to calculate both the average and section scores
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
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
const generateCSV = function (questionnaireData, personalDetails, scenarioResults, comments, scores) {
    const device_r = personalDetails.rightDeviceType === 'Other' ? personalDetails.rightDeviceTypeOther : personalDetails.rightDeviceType;
    const device_l = personalDetails.leftDeviceType === 'Other' ? personalDetails.leftDeviceTypeOther : personalDetails.leftDeviceType
    let toWrite = `Questionnaire Completed, Section,Average Rating, Item Number,Rating,Frequency,Importance,Listening Situation,` +
        `SSQ Completed By,Name,Date,Right Device Type, Left Device Type, Comments\n`
    questionnaireData.sections.forEach((section, sectionIndex) => {
        let itemNumber = 1;
        // ADD SCORE TO THE SECTION
        section.scenarios.forEach((scenario, scenarioIndex) => {
            let response = scenarioResults[itemNumber - 1]
            while (response.length < 3) {
                response.push("Not Applicable.")
            }

            let questionDescription = (scenario.description).replace(/,/g, "")
            toWrite += `${questionnaireData.title},${section.title},${scores.sectionScores[sectionIndex]}, ${itemNumber},${response[0]},${response[1]},${response[2]},` +
                `${questionDescription},${personalDetails.completedBy},${personalDetails.name},` +
                `${personalDetails.date},${device_r},${device_l}, ${comments[sectionIndex][scenarioIndex]}\n`
            itemNumber += 1;
        });
    });
    return Buffer.from(toWrite, 'utf8')
}


// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used generate the pdf report.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const generateAttachments = function (questionnaireId, personalDetails, questionnaireData, shareId, sortBy, comments, clinicianEmail) {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {

        Clinician.findOne({email: clinicianEmail}, function (err, clinician) {
            if (!err) {
                Questionnaire.findOne({questionnaireId}, function (err, questionnaire) {
                    if (!err) {
                        let section_score = [];

                        let subScaleScore = {
                            Speech: {SpQ: 0.0, SpN: 0.0, SpSp: 0.0, SpStrm: 0.0},
                            Spatial: {Localiz: 0.0, Dist: 0.0},
                            Qualities: {Segreg: 0.0, IDSound: 0.0, ListEff: 0.0}
                        }

                        let newSubScaleScore = calculateSubScaleScore(questionnaireData, subScaleScore);
                        console.log(newSubScaleScore)
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
                doc.image('assets/logo_complete.png', 450, 30, {width: 100})
                // prints heading for patient details
                doc.font('Helvetica-Bold').fontSize(14).text("Client Details", 30, 70);
                // purple overlay for patient information
                doc.fillOpacity(0.1).rect(30, 90, 550, 110).fill('purple');
                doc.fillOpacity(1).fill('black');

                // prints out patient information headings
                doc.font('Helvetica-Bold').fontSize(12)
                    .text('Name', 50, 110)
                    .text('Date of Birth', 250, 110)
                    .text('Right Device Type', 50, 150)
                    .text('Left Device Type', 250, 150)

                // prints out patient information
                const device_r = personalDetails.rightDeviceType === 'Other' ? personalDetails.rightDeviceTypeOther : personalDetails.rightDeviceType;
                const device_l = personalDetails.leftDeviceType === 'Other' ? personalDetails.leftDeviceTypeOther : personalDetails.leftDeviceType
                doc.font('Helvetica').fontSize(12)
                    .text(personalDetails.name, 50, 130)
                    .text(personalDetails.date, 250, 130)
                    .text(device_r, 50, 170)
                    .text(device_l, 250, 170)

                        // Catherine   // check if undefined, some early user dont have names.
                        console.log(clinician.firstName)
                        console.log(clinician.lastName)

                        if (!(questionnaire.isSSQ_Ch)) {
                            console.log(personalDetails.filledByTypeOption)
                            console.log(personalDetails.filledBy)
                        }

                        // Catherine

                        // THIS LINE PRINTS THE QUESTIONNAIRE RESULT IN THE DOC FILE
                        Share.findOne({shareId}, function (err, share
                        ) {
                            let sharedSections = null;
                            if (!err && share !== null) {
                                sharedSections = share.shareSection
                            }

                            const [resultToPrint, scenarioResults] = getQuestionnaireResponseJoin(questionnaire, questionnaireData, section_score, sharedSections);

                            const csvResult = generateCSV(resultToPrint, personalDetails, scenarioResults, comments, scores);

                    let lineSpacing = 230;
                    let margin = 0;
                    doc.font('Helvetica-Bold').fontSize(14).text("Questionnaire information", 30, lineSpacing);
                    doc.fillOpacity(0.1).rect(30, lineSpacing + 20, 550, 70).fill('purple');
                    doc.fillOpacity(1).fill('black');
                    lineSpacing += 40;
                    doc.font('Helvetica-Bold').fontSize(12)
                        .text('Questionnaire Name', 50, lineSpacing)
                        .text('SSQ Completed By', 250, lineSpacing)
                    lineSpacing += 20;
                    doc.font('Helvetica').fontSize(12)
                        .text(questionnaire.title, 50, lineSpacing)
                        .text(personalDetails.completedBy, 250, lineSpacing);

                    // prints out summary of section scores
                    doc.font('Helvetica-Bold').fontSize(14).text("Performance Rating Summary", 30, lineSpacing + 70);
                    lineSpacing += 110;
                    //lineSpacing += 30;

                    doc.font('Helvetica-Bold').fontSize(12).text("Overall Average Rating: ", 50, lineSpacing);
                    lineSpacing += 30;
                    resultToPrint.sections.forEach((section, sectionIndex) => {
                        doc.font('Helvetica-Bold').fontSize(12).text(section.title + " Average Rating: ", 50, lineSpacing);
                        margin = Math.ceil(doc.widthOfString(section.title + " Average Rating: ") / 10) * 10 + 60;
                        doc.font('Helvetica').text(scores.sectionScores[sectionIndex] === "N/A" ? "N/A" : scores.sectionScores[sectionIndex].toFixed(2), margin, lineSpacing);
                        lineSpacing += 30;
                        lineSpacing = addPage(doc, lineSpacing, doc.page.height);
                    })

                    doc.font('Helvetica').text(scores.averageScore, margin, 400);

                    doc.fillOpacity(0.1).rect(30, 380, 550, 140).fill('purple');
                    doc.fillOpacity(1).fill('black');
                    lineSpacing += 40
                    doc.font('Helvetica-Bold').fontSize(14).text("Questionnaire Responses", 30, lineSpacing);
                    lineSpacing += 30
                    doc.lineCap('butt').moveTo(30, lineSpacing).lineTo(doc.page.width - 30, lineSpacing).stroke();
                    lineSpacing += 20;

                    let sortedResults = {};

                    if (resultToPrint.isStandard) {
                        if (sortBy === HELPER_SORT.PERFORMANCE) {
                            sortedResults = sortByPerformance(resultToPrint)
                        } else {
                            sortedResults = sortByImportance(resultToPrint)
                        }
                    } else {
                        sortedResults = sortByPerformance(resultToPrint)
                    }
                    if (sortedResults.isStandard) {
                        printStandardQuestionnaireResults(doc, sortedResults, lineSpacing, comments)
                    } else {
                        printCustomQuestionnaireResults(doc, sortedResults, lineSpacing, comments)
                    }

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

            } else {
                reject({
                    error: err,
                });
            }
        });
    });
}

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports.generateAttachments = generateAttachments;
