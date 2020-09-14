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
    saveNewStandardisedQuestionnaire,
    updateQuestionnaireOnDatabase,
    editCustomisedQuestionnaire,
    deleteQuestionnaireFromDatabase,
    generateCopy,

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

// Get questionnaires
const getQuestionnaire = async (req, res) => {
    const questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire:", questionnaireId);
    const {err, foundQuestionnaire} = await findQuestionnaireById(questionnaireId);

    if (foundQuestionnaire != null){
        res.send({ statusCode: 200, message: "Valid", data: questionnaire });
    }else{
        res.send({ statusCode: 400, message: "Invalid", data: err });
    }
};

// given ClinicianId, gets the list of the clinician's customised questionnaire
const getClinicianQuestionnaires = async (req, res) => {
    const clinicianId = req.query.clinicianId;
    if (extractUserEmail(req) === clinicianId) {
        const {err, foundQuestionnaires} = await findQuestionnaireForClinician(clinicianId);
        if (foundQuestionnaires != null){
            res.send(foundQuestionnaires);
        }else{
            res.send(JSON.stringify(err));
        }
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
        const message = await saveNewCustomisedQuestionnaire(newQuestionnaire, clinicianId);
        res.send(JSON.stringify(message));
    } else {
        sendAuthroisationError(res);
    }
};

// add a standardised questionnaire
const addStandardisedQuestionnaire = async (req, res) => {
    const uuid = uuidv1();
    const newQuestionnaire = generateNewStandardisedQuestionnaire(uuid);
    const message = await saveNewStandardisedQuestionnaire(newQuestionnaire);
   res.send(JSON.stringify(message));
};

// edit a customised questionnaire
const editQuestionnaire = async (req, res) =>  {
    const userEmail = extractUserEmail(req);
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    const message = await editCustomisedQuestionnaire(userEmail, questionnaireId, editedQuestionnaire);
    res.send(JSON.stringify(message));
};

// edit a standardised questionnaire
const editStandardQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    const message = await updateQuestionnaireOnDatabase(questionnaireId, editedQuestionnaire, res);
    res.send(JSON.stringify(message));
};

// Delete customised questionnaire
const deleteQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.CQid;
    const userEmail = extractUserEmail(req);
    const clinicianId = req.body.clinicianId;
    const message = await deleteCustomisedQuestionnaireFromDatabase(questionnaireId, userEmail, clinicianId); 
    res.send(JSON.stringify(message));
};

//Delete standardised questionnaire
const deleteStandardisedQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.questionnaireID;
    const message = await deleteQuestionnaireFromDatabase(questionnaireId, "");
    res.send(JSON.stringify(message));
};

// gets all standardised questionnaires
const getStandardisedQuestionnaires = function (req, res) {
   const {err, questionnaires} = await findStandardisedQuestionnaires();
   if (!err && questionnaires != null) {
    res.send({
        statusCode: 200, message: "Valid", data: questionnaires });
} else {
    res.send({ statusCode: 400, message: "Invalid", data: err });
}
}
  

//Copy a questionnaire
const copyQuestionnaire = async (req, res) => {
    const uuid = uuidv1();
    const copiedQuestionnaire = req.body.questionnaire;
    const copyToCustomisedQuestionnaire =
        req.body.copyToCustomisedQuestionnaire;
    const clinicianId = req.body.clinicianId;

    const message = await copyQuestionnaireToDatabase(
        uuid, copiedQuestionnaire, copyToCustomisedQuestionnaire, clinicianId
    );

    res.send(JSON.stringify(message));
   
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
