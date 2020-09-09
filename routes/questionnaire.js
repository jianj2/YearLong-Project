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
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const domain = "http://localhost:3001";


// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://pediatric-scale.au.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: `${domain}/clinician`,
    issuer: `https://pediatric-scale.au.auth0.com/`,
    algorithms: ['RS256']
  });



// CRUD Routes for Posts

router.get('/getQuestionnaire/:questionnaireId', questionnaire_controller.getQuestionnaireAsync);
router.get('/clinician/', checkJwt, questionnaire_controller.getClinicianQuestionnaires);
router.get("/standardised",questionnaire_controller.getStandardisedQuestionnaires);

router.get("/:questionnaireId", questionnaire_controller.getQuestionnaireSync);

router.post('/deleteStandard', questionnaire_controller.deleteStandardisedQuestionnaire);
router.post('/delete', questionnaire_controller.deleteQuestionnaire);
router.post('/add', questionnaire_controller.addEmptyQuestionnaire);
router.post('/addStandard', questionnaire_controller.addStandardisedQuestionnaire);
router.post('/edit', questionnaire_controller.editQuestionnaire);

//Backdoor
//router.get('/', questionnaire_controller.getAllQuestionnaire);

module.exports = router;
