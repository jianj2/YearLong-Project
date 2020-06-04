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
            res.send(err);
        }
    });
};

var getQuestionnaire = function (req, res) {
    let questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire:", questionnaireId);

    Questionnaire.findOne({ questionnaireId }, function (err, questionnaire) {
        if (!err) {
            res.send(questionnaire);
        } else {
            res.send(err);
        }
    });
};

// given ClinicianId, gets the list of the clinician's customised questionnaires

const getClinicianQuestionnaires = function (req, res) {
    let clinicianId = req.query.clinicianId;

    Clinician.findOne({ clinicianId: clinicianId }, async function (err, clinician) {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            const questionnaires = await Questionnaire.find().where("questionnaireId").in(questionnaireIds).exec();
            res.send(questionnaires);
        } else {
            res.send(err);
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
        sections: [
            {
                title: "Speech",
                scenarios: [
                    {
                        description: "You are at Melbourne Uni...",
                        questions: [
                            {
                                isMCQ: false,
                                rangeOptions: ["Zero", "Ten"],
                            },
                            {
                                description: "If only one option can be true, which of the following is correct?",
                                isMCQ: true,
                                mcqOptions: [
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
            { title: "Spatial", scenarios: [] },
            { title: "Quality", scenarios: [] },
        ],
        isStandard: req.body.isStandard,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log("added customised questionnaire:", uuid, JSON.stringify(req.body));

        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid,
        });
    });

    // update specific clinician questionnaire
    let clinicianId = req.body.clinicianId;

    Clinician.updateOne({ clinicianId: clinicianId }, { $push: { questionnaires: uuid } }, (err, raw) => {
        return;
    });
};

// edit a questionnaire
// TODO: Receive an actual questionnaire from req.body, rather than creating a boiler plate.
const editQuestionnaire = function (req, res) {
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    Questionnaire.replaceOne({ questionnaireId: questionnaireId }, editedQuestionnaire, (err, raw) => {
        return;
    });
};

// Maybe used later for making incremental changes in db.
const editQuestionnaireQuestion = function (req, res) {
    console.log("editing questionnaire");

    //   const writeResult = Questionnaire.updateOne({questionnaireId: req.body.questionnaireId}, {$addToSet: {"sections": {title: "new section 26",
    //      scenarios: [] }} }, (err, raw) => {console.log(err, raw);});
    Questionnaire.updateOne(
        { questionnaireId: req.body.questionnaireId },
        { $push: { "sections.0.scenarios.0.questions": { isMCQ: false, rangeOptions: ["Three", "Nine"] } } },
        (err, raw) => {
            return;
        }
    );
};

// Delete questionnaire
const deleteQuestionnaire = function (req, res) {
    let questionnaireID = req.body.CQid;
    // console.log(result)
    Questionnaire.deleteOne({ questionnaireId: questionnaireID }, function (err, result) {
        console.log("deleted customised questionnaire: " + questionnaireID);
        if (!err) {
            res.send("successfully delete");
            // console.log('here')
        } else {
            res.send(err);
        }
    });

    // update specific clinician questionnaire
    let clinicianId = req.body.clinicianId;
    console.log(clinicianId);
    Clinician.updateOne({ clinicianId: clinicianId }, { $pull: { questionnaires: questionnaireID } }, (err, raw) => {
        return;
    });
};

module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.getQuestionnaire = getQuestionnaire;
module.exports.addEmptyQuestionnaire = addEmptyQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;
module.exports.editQuestionnaire = editQuestionnaire;
module.exports.getClinicianQuestionnaires = getClinicianQuestionnaires;
