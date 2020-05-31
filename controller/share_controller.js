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
        readOnly:req.body.readOnly,
        message:req.body.message,
    });

    newShare.save(function(err, createdShare) {
        if (!err){
            res.send(createdShare);
        } else {
            res.send(err);
        }
    })
};

// Get ShareDetails using ShareId
var getShareDetails = function (req, res) {
    let shareId = req.params.shareId;

    Share.findOne({ shareId }, function (
        err,
        share
    ) {
        if (!err) {
            res.send(share);
        } else {
            res.send(err);
        }
    });
};


module.exports.getShareDetails = getShareDetails;
module.exports.shareQuestionnaire = shareQuestionnaire;
