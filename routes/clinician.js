/**
 * =========================================
 * ROUTES OF CLINICIAN (USING EXPRESS.ROUTER)
 * =========================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/clinician.js is used for defining the routes of each API call in clinician_controller made from the frontend
 */

const express = require('express');
const router = express.Router();
const clinician_controller = require('../controller/clinician_controller.js');
const share_controller = require('../controller/share_controller.js');


// Used to get all the clinicians.
router.get('/', clinician_controller.getAllClinician);

// Used to share a questionnaire with the parent/child.
//router.post("/share", clinician_controller.shareQuestionnaire);
router.post("/share", share_controller.shareQuestionnaire);

// Used to share a questionnaire with the parent/child.
//router.post("/share", clinician_controller.shareQuestionnaire);
router.post("/complete-questionnaire", clinician_controller.completeQuestionnaire);

module.exports = router;
