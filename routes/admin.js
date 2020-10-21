/**
 * =============================================================================
 * ROUTES OF ADMIN (USING EXPRESS.ROUTER)
 * =============================================================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The routes/admin.js is used for defining the routes of each API call in admin_controller made from the frontend
 */

const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/admin_controller.js');


// CRUD Routes for Admin-related requests

router.post('/login', admin_controller.loginAdmin);
router.post('/instruction/:type', admin_controller.authorize, admin_controller.updateInstructionByType);

router.get('/specificInstruction/:instructionType', admin_controller.getSpecificInstruction);
router.get("/verifylogin/:token", admin_controller.verifyLogin);
router.get("/instructionsSummary",admin_controller.getInstructionsSummary);

//router for getting the organisation information
router.get("/country", admin_controller.authorize, admin_controller.getCountryList);
router.get("/country/organisation/:countryName", admin_controller.authorize, admin_controller.getOrganisations);
router.get("/organisation/clinician/:organisationName", admin_controller.authorize, admin_controller.getOrganisationClinicians);


module.exports = router;
