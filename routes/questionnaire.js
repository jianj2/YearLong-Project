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
const admin_controller = require('../controller/admin_controller.js');
const {checkJwt} = require("../utils/jwtUtils");

//CRUD requests for questionnaires 

router.get('/clinician/', checkJwt, questionnaire_controller.getClinicianQuestionnaires);
router.get("/standardised",questionnaire_controller.getStandardisedQuestionnaires);
router.get("/:questionnaireId", questionnaire_controller.getQuestionnaire);

router.post('/deleteStandard', questionnaire_controller.deleteStandardisedQuestionnaire);
router.post('/delete', checkJwt, questionnaire_controller.deleteQuestionnaire);
router.post('/add', checkJwt, questionnaire_controller.addEmptyQuestionnaire);
router.post('/addStandard',admin_controller.authorize, questionnaire_controller.addStandardisedQuestionnaire);
router.post('/edit', checkJwt, questionnaire_controller.editQuestionnaire);
router.post('/editStandard',admin_controller.authorize, questionnaire_controller.editStandardQuestionnaire);
router.post('/copy', questionnaire_controller.copyQuestionnaire);


module.exports = router;
