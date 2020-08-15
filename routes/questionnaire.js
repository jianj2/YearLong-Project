/**
 * ===============================================
 * ROUTES OF QUESTIONNAIRES (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/questionnaire.js is used for defining the routes of each API call in questionnaire_controller made from the frontend.
 */


const express = require('express');
const router = express.Router();
const questionnaire_controller = require('../controller/questionnaire_controller.js');

// CRUD Routes for Posts



router.get('/getQuestionnaire/:questionnaireId', questionnaire_controller.getQuestionnaireAsync);
router.get('/clinician/', questionnaire_controller.getClinicianQuestionnaires);
router.get("/standardised",questionnaire_controller.getStandardisedQuestionnaires);
router.get('/', questionnaire_controller.getAllQuestionnaire);
router.get("/:questionnaireId", questionnaire_controller.getQuestionnaireSync);

router.post('/delete', questionnaire_controller.deleteQuestionnaire);
router.post('/add', questionnaire_controller.addEmptyQuestionnaire);
router.post('/edit', questionnaire_controller.editQuestionnaire);

module.exports = router;
