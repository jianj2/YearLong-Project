/**
 * ============================================
 * DEFINING QUESTIONNAIRE API CALLS CONTROLLER
 * ============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe, Cary
 *
 * The questionnaire_controller is used for defining the functionality of api calls related to questionnaires.
 *
 */

const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const { extractUserEmail } = require("../utils/jwtUtils");
const {
    attachQuestionnaireToClinician,
    findQuestionnaireForClinician,
    generateNewCustomisedQuestionnaire,
    generateNewStandardisedQuestionnaire,
    updateQuestionnaireOnDatabase,
    deleteQuestionnaireFromDatabase,
    generateCopy
} = require("../service/questionnaireService");

const sendAuthroisationError = (res) => {
    res.send(
        JSON.stringify("You do not have access to the clinician account.")
    );
};

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
const getQuestionnaire = function (req, res) {
    let questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire:", questionnaireId);

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

// given ClinicianId, gets the list of the clinician's customised questionnaire
const getClinicianQuestionnaires = function (req, res) {
    let clinicianId = req.query.clinicianId;
    if (extractUserEmail(req) === clinicianId) {
        findQuestionnaireForClinician(clinicianId, res);
    } else {
        sendAuthroisationError(res);
    }
};

// add an empty customised questionnaire for clincians
const addEmptyQuestionnaire = async (req, res) => {
    const userEmail = extractUserEmail(req);
    const clinicianId = req.body.clinicianId;
    const uuid = uuidv1();

    if (userEmail === clinicianId) {
        let newQuestionnaire = generateNewCustomisedQuestionnaire(uuid);
        newQuestionnaire.save(function (err, createdQuestionnaire) {
            if (!err) {
                attachQuestionnaireToClinician(uuid, clinicianId, res);
            } else {
                res.send(
                    JSON.stringify(
                        "Customised Questionnaire cannot be created. "
                    )
                );
            }
        });
    } else {
        sendAuthroisationError(res);
    }
};

// add a standardised questionnaire
const addStandardisedQuestionnaire = (req, res) => {
    const uuid = uuidv1();

    let newQuestionnaire = generateNewStandardisedQuestionnaire(uuid);

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log("added standardised questionnaire:", uuid);

        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid,
        });
    });
};

// edit a customised questionnaire
const editQuestionnaire = function (req, res) {
    const userEmail = extractUserEmail(req);
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;

    const validateAndUpdate = (err, clinician) => {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            if (questionnaireIds.includes(questionnaireId)) {
                updateQuestionnaireOnDatabase(
                    questionnaireId,
                    editedQuestionnaire,
                    res
                );
            } else {
                res.send(
                    JSON.stringify(
                        "The edited questionnaire does not belong to the clinician."
                    )
                );
            }
        } else {
            res.send(JSON.stringify(err));
        }
    };
    Clinician.findOne({ clinicianId: userEmail }, validateAndUpdate);
};

// edit a standardised questionnaire
const editStandardQuestionnaire = function (req, res) {
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    updateQuestionnaireOnDatabase(questionnaireId, editedQuestionnaire, res);
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

// Delete customised questionnaire
const deleteQuestionnaire = function (req, res) {
    let questionnaireId = req.body.CQid;
    const userEmail = extractUserEmail(req);
    const clinicianId = req.body.clinicianId;
    const validateAndDelete = (err, clinician) => {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            if (questionnaireIds.includes(questionnaireId)) {
                deleteQuestionnaireFromDatabase(
                    questionnaireId,
                    clinicianId,
                    res
                );
            } else {
                res.send(
                    JSON.stringify(
                        "The questionnaire to be deleted does not belong to the clinician."
                    )
                );
            }
        } else {
            res.send(JSON.stringify(err));
        }
    };

    Clinician.findOne({ clinicianId: userEmail }, validateAndDelete);
};

//Delete standardised questionnaire
const deleteStandardisedQuestionnaire = (req, res) => {
    let questionnaireId = req.body.questionnaireID;
    deleteQuestionnaireFromDatabase(questionnaireId, "", res);
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

//Copy a questionnaire
const copyQuestionnaire = function (req, res) {
    const uuid = uuidv1();
    const copiedQuestionnaire = req.body.questionnaire;
    const copyToCustomisedQuestionnaire =
        req.body.copyToCustomisedQuestionnaire;

    const newQuestionnaire = generateCopy(
        copiedQuestionnaire,
        uuid,
        !copyToCustomisedQuestionnaire
    );

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log(
            "added customised questionnaire:",
            uuid,
            JSON.stringify(newQuestionnaire)
        );
    });

    let clinicianId = req.body.clinicianId;
    attachQuestionnaireToClinician(uuid, clinicianId, res);
};

module.exports.copyQuestionnaire = copyQuestionnaire;
module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.getQuestionnaire = getQuestionnaire;
module.exports.addEmptyQuestionnaire = addEmptyQuestionnaire;
module.exports.addStandardisedQuestionnaire = addStandardisedQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;
module.exports.deleteStandardisedQuestionnaire = deleteStandardisedQuestionnaire;
module.exports.editQuestionnaire = editQuestionnaire;
module.exports.editStandardQuestionnaire = editStandardQuestionnaire;
module.exports.getClinicianQuestionnaires = getClinicianQuestionnaires;
module.exports.getStandardisedQuestionnaires = getStandardisedQuestionnaires;
