/**
 * ========================================
 * DEFINING CLINICIAN API CALLS CONTROLLER
 * ========================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The clinician_controller is used for defining the functionality of api calls related to clinicians.
 *
 */

const mongoose = require('mongoose');

const { sendResultsEmail } = require('../service/emailService');

const { extractUserEmail } = require("../utils/jwtUtils");

// Clinician completes the questionnaire
const completeQuestionnaire = function (req, res) {
    let questionnaireData  = req.body.questionnaireData;
    let clinicianEmail  = req.body.clinicianEmail;
    let personalDetails  = req.body.personalDetails;
    let questionnaireId  = req.body.questionnaireId;
    let comments = req.body.comments;
    let sortBy  = req.body.sortBy;

    console.log("sortBy ",sortBy);
    const userEmail = extractUserEmail(req);
    if(userEmail === clinicianEmail){
        sendResultsEmail(questionnaireId, questionnaireData, clinicianEmail, personalDetails, sortBy, undefined ,comments)
        .then(emailRes => res.status(200).json(emailRes))
        .catch(emailRej => res.status(400).json(emailRej));
    }else{
        res.status(401).json("Authorisation failed.");
    }

   
}

module.exports.completeQuestionnaire = completeQuestionnaire;