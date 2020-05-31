/**
 * ===============================================
 * ROUTES OF QUESTIONNAIRES (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/questionnaire.js is used for defining the routes of each API call in questionnaire_controller made from the frontend.
 */


var express = require('express');
var router = express.Router();
var questionnaire_controller = require('../controller/questionnaire_controller.js');

// CRUD Routes for Posts


router.get('/', questionnaire_controller.getAllQuestionnaire);
router.get('/getQuestionnaire/:questionnaireID', questionnaire_controller.getQuestionnaire);
router.get('/clinician/', questionnaire_controller.getClinicianQuestionnaires);


router.post('/delete', questionnaire_controller.deleteQuestionnaire);
router.post('/add', questionnaire_controller.addFilledQuestionnaire);
router.post('/edit', questionnaire_controller.editQuestionnaire);


module.exports = router;
