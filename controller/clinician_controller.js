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

const Clinician = mongoose.model('clinician');

const { sendResultsEmail } = require('../service/emailService');

const { extractUserEmail } = require("../utils/jwtUtils");



// Get all clinician details.
const getAllClinician = function (req, res) {
    Clinician.find(function (err, allClinician) {
        if (!err) {
            res.send(allClinician);
        } else {
            res.send(err);
        }
    });
};

// Create a new clinician.
const createClinician = function (req, res) {
    const newClinician = new Clinician({
        clinicianId: 'id1',
        name: "Uvin Abeysinghe",
        email: "asb@salkdjac.om",
        questionnaires: ['questionnaireId1', 'questionnaireId2'],
    });

    newClinician.save(function (err, createdClinician) {
        if (!err) {
            res.send(createdClinician);
        } else {
            res.send(err);
        }
    })
}

// Clinician completes the questionnaire
const completeQuestionnaire = function (req, res) {
    let questionnaireData  = req.body.questionnaireData;
    let clinicianEmail  = req.body.clinicianEmail;
    let personalDetails  = req.body.personalDetails;
    let questionnaireId  = req.body.questionnaireId;
    let sortBy  = req.body.sortBy;

    console.log("sortBy ",sortBy);
    const userEmail = extractUserEmail(req);
    if(userEmail === clinicianEmail){
        sendResultsEmail(questionnaireId, questionnaireData, clinicianEmail, personalDetails, sortBy)
        // .then(emailRes => res.send(emailRes))
        // .catch(emailRej => res.send(emailRej));
    }else{
        res.send(JSON.stringify("Authorisation failed."));
    }

   
}


module.exports.getAllClinician = getAllClinician;
module.exports.createClinician = createClinician;
module.exports.completeQuestionnaire = completeQuestionnaire;