/**
 * =========================================
 * ROUTES OF CLINICIAN (USING EXPRESS.ROUTER)
 * =========================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/clinician.js is used for defining the routes of each API call in clinician_controller made from the frontend
 */

var express = require('express');
var router = express.Router();
var clinician_controller = require('../controller/clinician_controller.js');


// CRUD Routes for Posts
router.get('/', clinician_controller.getAllClinician);
//router.get('/123', clinician_controller.createClinician);
router.post("/share", clinician_controller.shareQuestionnaire);

module.exports = router;
