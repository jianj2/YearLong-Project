/**
 * =============================================================================
 * DEFINING CLINICIAN API CALLS CONTROLLER
 * =============================================================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The clinician_controller is used for defining the functionality of api calls related to clinicians.
 *
 */
// Import Libraries.
const { sendResultsEmail } = require("../service/emailService");
const { extractUserEmail } = require("../utils/jwtUtils");

// Clinician completes the questionnaire
const completeQuestionnaire = (req, res) => {
    const questionnaireData = req.body.questionnaireData;
    const clinicianEmail = req.body.clinicianEmail;
    const personalDetails = req.body.personalDetails;
    const questionnaireId = req.body.questionnaireId;
    const comments = req.body.comments;
    const sortBy = req.body.sortBy;

    const userEmail = extractUserEmail(req);
    if (userEmail === clinicianEmail) {
        sendResultsEmail(
            questionnaireId,
            questionnaireData,
            clinicianEmail,
            personalDetails,
            sortBy,
            undefined,
            comments
        )
            .then((emailRes) => res.status(200).json(emailRes))
            .catch((emailRej) => res.status(400).json(emailRej));
    } else {
        res.status(401).json("Authorisation failed.");
    }
};

module.exports.completeQuestionnaire = completeQuestionnaire;
