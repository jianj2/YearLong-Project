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

router.get('/specificInstruction/:instructionType', admin_controller.getSpecificInstruction);
router.get("/verifylogin/:token", admin_controller.verifyLogin);
router.get("/instructionsSummary", admin_controller.getInstructionsSummary);

//router for getting the organisation information
router.get("/country", admin_controller.getCountryList);
router.get("/country/organisation/:countryName", validateToken, admin_controller.getOrganisations);
router.get("/organisation/clinician/:organisationName", admin_controller.getOrganisationClinicians);


// validate Token
function validateToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
