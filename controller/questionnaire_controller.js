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

const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");

// Get all questionnaires
const getAllQuestionnaire = function (req, res) {
    Questionnaire.find(function (err, allQuestionnaires) {
        if (!err) {
            res.send(allQuestionnaires);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

// Get questionnaires in sync
const getQuestionnaireSync = function (req, res) {
    let questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire sync:", questionnaireId);

    Questionnaire.findOne({ questionnaireId }, function (err, questionnaire) {
        if (!err && questionnaire != null) {
            res.send({
                statusCode: 200,
                message: "Valid",
                data: questionnaire,
            });
        } else {
            res.send({ statusCode: 400, message: "Invalid", data: err });
        }
    });
};

// Get questionnaires in async
const getQuestionnaireAsync = function (req, res) {
    let questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire async:", questionnaireId);

    Questionnaire.findOne({ questionnaireId }, function (err, questionnaire) {
        if (!err && questionnaire != null) {
            res.send(questionnaire);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

// given ClinicianId, gets the list of the clinician's customised questionnaires

const getClinicianQuestionnaires = function (req, res) {
    let clinicianId = req.query.clinicianId;

    Clinician.findOne({ clinicianId: clinicianId }, async function (
        err,
        clinician
    ) {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            const questionnaires = await Questionnaire.find()
                .where("questionnaireId")
                .in(questionnaireIds)
                .exec();
            res.send(questionnaires);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

// add an empty questionnaire
const addEmptyQuestionnaire = function (req, res) {
    const uuid = uuidv1();

    let newQuestionnaire = new Questionnaire({
        questionnaireId: uuid,
        title: "New Questionnaire",
        description: "Please click edit to begin with this questionnaire.",
        isSSQ_Ch: true,
        sections: [
            {
                title: "Section 1 - Speech",
                scenarios: [
                    {
                        description: "You are at Melbourne Uni...",
                        questions: [
                            {
                                isMCQ: false,
                                rangeOptions: ["Zero", "Ten"],
                            },
                            {
                                description:
                                    "If only one option can be true, which of the following is correct?",
                                isMCQ: true,
                                MCQOptions: [
                                    "All of the above is true",
                                    " Those below the below is true",
                                    "None of the above is true",
                                    "Those above the above is true",
                                ],
                            },
                        ],
                    },
                ],
            },
            { title: "Section 2 - Spatial", scenarios: [] },
            { title: "Section 3 - Quality", scenarios: [] },
        ],
        isStandard: req.body.isStandard,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log(
            "added customised questionnaire:",
            uuid,
            JSON.stringify(req.body)
        );

        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid,
        });
    });

    // update specific clinician questionnaire
    let clinicianId = req.body.clinicianId;

    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $push: { questionnaires: uuid } },
        (err, raw) => {
            return;
        }
    );
};

// add a standardised questionnaire

const addStandardisedQuestionnaire = (req, res) => {
    const uuid = uuidv1();

    let newQuestionnaire = new Questionnaire({
        questionnaireId: uuid,
        title: "New Standard Questionnaire",
        description: "Please click edit to begin with this questionnaire.",
        isSSQ_Ch: true,
        sections: [
            { title: "Section 1 - Speech", scenarios: [] },
            { title: "Section 2 - Spatial", scenarios: [] },
            { title: "Section 3 - Quality", scenarios: [] },
        ],
        isStandard: true,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log(
            "added standardised questionnaire:",
            uuid,
        );

        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid,
        });
    });
};

// edit a questionnaire
const editQuestionnaire = function (req, res) {
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    Questionnaire.replaceOne(
        { questionnaireId: questionnaireId },
        editedQuestionnaire,
        (err, raw) => {
            if (!err) {
                res.send(JSON.stringify("successfully edited"));
                // console.log('here')
            } else {
                res.send(JSON.stringify(err));
            }
        }
    );
};

// Maybe used later for making incremental changes in db.
const editQuestionnaireQuestion = function (req, res) {
    console.log("editing questionnaire");

    //   const writeResult = Questionnaire.updateOne({questionnaireId: req.body.questionnaireId}, {$addToSet: {"sections": {title: "new section 26",
    //      scenarios: [] }} }, (err, raw) => {console.log(err, raw);});
    Questionnaire.updateOne(
        { questionnaireId: req.body.questionnaireId },
        {
            $push: {
                "sections.0.scenarios.0.questions": {
                    isMCQ: false,
                    rangeOptions: ["Three", "Nine"],
                },
            },
        },
        (err, raw) => {
            if (!err) {
                res.send(JSON.stringify("successfully edited"));
            } else {
                res.send(JSON.stringify(err));
            }
        }
    );
};

// Delete questionnaire
const deleteQuestionnaire = function (req, res) {
    let questionnaireID = req.body.CQid;
    // console.log(result)
    Questionnaire.deleteOne({ questionnaireId: questionnaireID }, function (
        err,
        result
    ) {
        console.log("deleted customised questionnaire: " + questionnaireID);
        if (!err) {
            res.send(JSON.stringify("successfully deleted"));
        } else {
            res.send(JSON.stringify(err));
        }
    });

    // update specific clinician questionnaire
    let clinicianId = req.body.clinicianId;
    console.log(clinicianId);
    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $pull: { questionnaires: questionnaireID } },
        (err, raw) => {
            return;
        }
    );
};

//Delete standardised questionnaire
const deleteStandardisedQuestionnaire = (req, res) => {
    let questionnaireID = req.body.questionnaireID;
    // console.log(result)
    Questionnaire.deleteOne({ questionnaireId: questionnaireID }, function (
        err,
        result
    ) {
        console.log("deleted customised questionnaire: " + questionnaireID);
        if (!err) {
            let message = JSON.stringify(`successfully deleted standard questionnaire ${questionnaireID}`);
            res.send(message);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

// gets all standardised questionnaires
const getStandardisedQuestionnaires = function (req, res) {
    Questionnaire.find({ isStandard: true }, function (err, questionnaires) {
        if (!err && questionnaires != null) {
            res.send({
                statusCode: 200,
                message: "Valid",
                data: questionnaires,
            });
        } else {
            res.send({ statusCode: 400, message: "Invalid", data: err });
        }
    });
};

// // edit a questionnaire
// const editQuestionnaire = function (req, res) {
//     const questionnaireId = req.body.questionnaire.questionnaireId;
//     const editedQuestionnaire = req.body.questionnaire;
//     Questionnaire.replaceOne(
//         { questionnaireId: questionnaireId },
//         editedQuestionnaire,
//         (err, raw) => {
//             if (!err) {
//                 res.send(JSON.stringify("successfully edited"));
//                 // console.log('here')
//             } else {
//                 res.send(JSON.stringify(err));
//             }
//         }
//     );
// };

//Copy a questionnaire
const copyQuestionnaire = function (req, res) {
    const uuid = uuidv1();
    const copiedQuestionnaire = req.body.questionnaire;
    const copyToCustomisedQuestionnaire = req.body.copyToCustomisedQuestionnaire;

    let newQuestionnaire = new Questionnaire(
        {
            ...copiedQuestionnaire,
            questionnaireId: uuid,
            isStandard: copyToCustomisedQuestionnaire,
            title: copiedQuestionnaire.title + " - Copy",
        }    
    );

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log(
            "added customised questionnaire:",
            uuid,
            JSON.stringify(newQuestionnaire)
        );

        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid,
        });
    });

    // update specific clinician questionnaire
    let clinicianId = req.body.clinicianId;

    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $push: { questionnaires: uuid } },
        (err, raw) => {
            return;
        }
    );
};

module.exports.copyQuestionnaire= copyQuestionnaire;
module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.getQuestionnaireSync = getQuestionnaireSync;
module.exports.addEmptyQuestionnaire = addEmptyQuestionnaire;
module.exports.addStandardisedQuestionnaire = addStandardisedQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;
module.exports.deleteStandardisedQuestionnaire = deleteStandardisedQuestionnaire;
module.exports.editQuestionnaire = editQuestionnaire;
module.exports.getClinicianQuestionnaires = getClinicianQuestionnaires;
module.exports.getQuestionnaireAsync = getQuestionnaireAsync;
module.exports.getStandardisedQuestionnaires = getStandardisedQuestionnaires;
