/**
 * ========================================
 * DEFINING SHARE API CALLS CONTROLLER
 * ========================================
 * @date created: 31 May 2020
 * @authors: Uvin
 *
 * The share_controller is used for defining the functionality of api calls related to share.
 *
 */

const mongoose = require("mongoose");
const Share = mongoose.model("share");
const { v1: uuidv1 } = require("uuid");


// Create a new share.
var shareQuestionnaire = function (req,res) {
    const uuid = uuidv1();
    let newShare = new Share({
        shareId: uuid,
        clinicianEmail: req.body.clinicianEmail,
        patientEmail: req.body.patientEmail,
        questionnaireId: req.body.questionnaireId,
    });

    newShare.save(function(err, createdShare) {
        if (!err){
            res.send(createdShare);
        } else {
            res.send(err);
        }
    })
};

// Get questionnaireId using ShareId
var getQuestionnaireId = function (req, res) {
    let ShareId = req.params.shareId;

    Share.findOne({ ShareId }, function (
        err,
        questionnaireId
    ) {
        if (!err) {
            res.send(questionnaireId);
        } else {
            res.send(err);
        }
    });
};


module.exports.getQuestionnaireId = getQuestionnaireId;
module.exports.shareQuestionnaire = shareQuestionnaire;
