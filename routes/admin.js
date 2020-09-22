/**
 * =========================================
 * ROUTES OF ADMIN (USING EXPRESS.ROUTER)
 * =========================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The routes/admin.js is used for defining the routes of each API call in admin_controller made from the frontend
 */

const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/admin_controller.js');


// CRUD Routes for Posts
//admin_controller.addInstruction();

router.post('/login', admin_controller.loginAdmin);
router.post('/instruction/:type', admin_controller.updateInstructionByType);

router.get('/instruction', admin_controller.getInstruction);
router.get('/specificInstruction/:instructionType', admin_controller.getSpecificInstruction);
router.get("/verifylogin/:token", admin_controller.verifyLogin);
router.get('/getStandardisedQuestionnaire', admin_controller.getStandardisedQuestionnaire);
router.get("/instructionsSummary", admin_controller.getInstructionsSummary);

//test router for testing getting the organisation information
router.get("/organisation", admin_controller.getOrganisations);
router.get("/organisation/:organisationName", admin_controller.getOrganisationClinicians);

module.exports = router;