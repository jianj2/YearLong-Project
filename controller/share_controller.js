/**
 * ========================================
 * DEFINING SHARE API CALLS CONTROLLER
 * ========================================
 * @date created: 31 May 2020
 * @authors: Uvin, Waqas
 *
 * The share_controller is used for defining the functionality of api calls related to share.
 *
 */

const mongoose = require("mongoose");
const Share = mongoose.model("share");
const {v1: uuidv1} = require("uuid");
const nodemailer = require('nodemailer');
const path = require("path");
const Readable = require('stream').Readable

const {sendInvitationEmail, sendResultsEmail} = require('./email_controller');


// Create a new share.
const shareQuestionnaire = function (req, res) {

    // convert to a list of objects
    let visibleSection = []
    Object.entries(req.body.shareSection).map((k, v) => {
        visibleSection.push({title: k[0], isVisible: k[1]});
    })


    const uuid = uuidv1();
    let newShare = new Share({
        shareId: uuid,
        clinicianEmail: req.body.clinicianEmail,
        patientEmail: req.body.patientEmail,
        questionnaireId: req.body.questionnaireId,
        readOnly: req.body.readOnly,
        message: req.body.message,
        shareSection: visibleSection,
    });

    console.log("newShare", newShare)

    newShare.save(function (err, createdShare) {
        console.log("Share created");

        if (!err) {
            sendInvitationEmail(createdShare)
                .then(emailRes => {
                    if (emailRes.success) {
                        console.log("SEND SHARE");
                        res.send(emailRes);
                    }
                })
                .catch(emailRej => {
                    if (emailRej.success) {
                        console.log("FAIL SHARE");
                        res.send(emailRej);
                    }
                })

        } else {
            console.log("err SHARE", err);
            console.log("err SHARE");
            res.send(err);
        }
    })
};

// Get ShareDetails using ShareId
const getShareDetails = function (req, res) {
    let shareId = req.params.shareId;

    Share.findOne({shareId}, function (
        err,
        share
    ) {
        if (!err && share != null) {
            res.send({statusCode: 200, message: "Valid ShareId", data: share});
        } else {
            res.send({statusCode: 400, message: "Invalid ShareId", data: err})
        }
    });
};

// Method called when share response is completed.
const completeShare = function (req, res) {
    let questionnaireData = req.body.questionnaireData;
    let clinicianEmail = req.body.clinicianEmail;
    let personalDetails = req.body.personalDetails;
    let questionnaireId = req.body.questionnaireId;

    sendResultsEmail(questionnaireId, questionnaireData, clinicianEmail, personalDetails)
        .then(emailRes => {
            deleteShare(req, res);
            res.send(emailRes)
        })
        .catch(emailRej => res.send(emailRej))
};

// Delete the share from our database.
const deleteShare = function (req, res) {
    const shareId = req.params.shareId;
    Share.deleteOne({shareId: shareId}, function (
        err,
        result
    ) {
        console.log("Share Deleted:: " + shareId);
    });
};




module.exports.sendInvitationEmail = sendInvitationEmail;
module.exports.sendResultsEmail = sendResultsEmail;
module.exports.deleteShare = deleteShare;
module.exports.completeShare = completeShare;
module.exports.getShareDetails = getShareDetails;
module.exports.shareQuestionnaire = shareQuestionnaire;
