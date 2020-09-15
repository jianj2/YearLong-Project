/**
 * ============================================
 * DEFINING QUESTIONNAIRE API CALLS CONTROLLER
 * ============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe, Cary
 *
 * The questionnaire controller is used for defining 
 * the functionality of API calls related to questionnaires.
 *
 */

const { v1: uuidv1 } = require("uuid");

const { extractUserEmail } = require("../utils/jwtUtils");
const {
    findQuestionnaireById,
    findQuestionnaireForClinician,
    findStandardisedQuestionnaires,
    generateNewCustomisedQuestionnaire,
    generateNewStandardisedQuestionnaire,
    saveNewStandardisedQuestionnaire,
    saveNewCustomisedQuestionnaire,
    updateQuestionnaireOnDatabase,
    editCustomisedQuestionnaire,
    deleteQuestionnaireFromDatabase,
    deleteCustomisedQuestionnaireFromDatabase,
    copyQuestionnaireToDatabase,
} = require("../service/questionnaireService");

const sendAuthroisationError = (res) => {
    res.send(
        JSON.stringify("You do not have access to the clinician account.")
    );
};

const sendJSONResponse = (res, data, error, errorCode) => {
    if (data != null && !error) {
        res.status(200).json(data);
    } else {
        res.status(errorCode).json(error.message);
        console.log(error.message);
    }
};

// Get a questionnaire by ID from request
const getQuestionnaire = async (req, res) => {
    const questionnaireId = req.params.questionnaireId;
    console.log("get questionnaire:", questionnaireId);
    const [err, foundQuestionnaire] = await findQuestionnaireById(
        questionnaireId
    );

    sendJSONResponse(res, foundQuestionnaire, err, 404);
};

// given ClinicianId, gets the list of the clinician's customised questionnaire
const getClinicianQuestionnaires = async (req, res) => {
    const clinicianId = req.query.clinicianId;
    if (extractUserEmail(req) === clinicianId) {
        const [err, foundQuestionnaires] = await findQuestionnaireForClinician(
            clinicianId
        );
        sendJSONResponse(res, foundQuestionnaires, err, 404);
    } else {
        sendAuthroisationError(res);
    }
};

// add an empty customised questionnaire for clincians
const addEmptyQuestionnaire = async (req, res) => {
    const userEmail = extractUserEmail(req);
    const clinicianId = req.body.clinicianId;
    if (userEmail === clinicianId) {
        const uuid = uuidv1();
        let newQuestionnaire = generateNewCustomisedQuestionnaire(uuid);
        const [err, message] = await saveNewCustomisedQuestionnaire(
            newQuestionnaire,
            clinicianId
        );
        sendJSONResponse(res, message, err, 500);
    } else {
        sendAuthroisationError(res);
    }
};

// add a standardised questionnaire
const addStandardisedQuestionnaire = async (req, res) => {
    const uuid = uuidv1();
    const newQuestionnaire = generateNewStandardisedQuestionnaire(uuid);
    const [err, message] = await saveNewStandardisedQuestionnaire(
        newQuestionnaire
    );
    sendJSONResponse(res, message, err, 500);
};

// edit a customised questionnaire
const editQuestionnaire = async (req, res) => {
    const userEmail = extractUserEmail(req);
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    const [err, message] = await editCustomisedQuestionnaire(
        userEmail,
        questionnaireId,
        editedQuestionnaire
    );

    sendJSONResponse(res, message, err, 500);
};

// edit a standardised questionnaire
const editStandardQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.questionnaire.questionnaireId;
    const editedQuestionnaire = req.body.questionnaire;
    const [err, message] = await updateQuestionnaireOnDatabase(
        questionnaireId,
        editedQuestionnaire
    );
    sendJSONResponse(res, message, err, 500);
};

// Delete customised questionnaire
const deleteQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.CQid;
    const userEmail = extractUserEmail(req);
    const clinicianId = req.body.clinicianId;
    const [err, message] = await deleteCustomisedQuestionnaireFromDatabase(
        questionnaireId,
        userEmail,
        clinicianId
    );
    sendJSONResponse(res, message, err, 500);
};

//Delete standardised questionnaire
const deleteStandardisedQuestionnaire = async (req, res) => {
    const questionnaireId = req.body.questionnaireID;
    const [err, message] = await deleteQuestionnaireFromDatabase(
        questionnaireId,
        ""
    );
    sendJSONResponse(res, message, err, 500);
};

// gets all standardised questionnaires
const getStandardisedQuestionnaires = async (req, res) => {
    const [err, questionnaires] = await findStandardisedQuestionnaires();
    sendJSONResponse(res, questionnaires, err, 404);
};

//Copy a questionnaire
const copyQuestionnaire = async (req, res) => {
    const copiedQuestionnaire = req.body.questionnaire;
    const copyToCustomisedQuestionnaire =
        req.body.copyToCustomisedQuestionnaire;
    const clinicianId = req.body.clinicianId;
    const [err, message] = await copyQuestionnaireToDatabase(
        copiedQuestionnaire,
        copyToCustomisedQuestionnaire,
        clinicianId
    );

    sendJSONResponse(res, message, err, 500);
};

module.exports.copyQuestionnaire = copyQuestionnaire;
module.exports.getQuestionnaire = getQuestionnaire;
module.exports.addEmptyQuestionnaire = addEmptyQuestionnaire;
module.exports.addStandardisedQuestionnaire = addStandardisedQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;
module.exports.deleteStandardisedQuestionnaire = deleteStandardisedQuestionnaire;
module.exports.editQuestionnaire = editQuestionnaire;
module.exports.editStandardQuestionnaire = editStandardQuestionnaire;
module.exports.getClinicianQuestionnaires = getClinicianQuestionnaires;
module.exports.getStandardisedQuestionnaires = getStandardisedQuestionnaires;
