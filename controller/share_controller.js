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

// Import Libraries
const mongoose = require("mongoose");
const Share = mongoose.model("share");
const { v1: uuidv1 } = require("uuid");
const { extractUserEmail } = require("../utils/jwtUtils");
const { sendInvitationEmail, sendResultsEmail } = require("../service/emailService");

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to create a new share.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const shareQuestionnaire = function (req, res) {
    const userEmail = extractUserEmail(req);
    const clinicianEmail = req.body.clinicianEmail

    if (clinicianEmail === userEmail) {
        // convert to a list of objects
        let visibleSection = [];
        Object.entries(req.body.shareSection).map((k, v) => {
            visibleSection.push({ title: k[0], isVisible: k[1] });
        });

        const uuid = uuidv1();
        let newShare = new Share({
            shareId: uuid,
            clinicianEmail: req.body.clinicianEmail,
            patientEmail: req.body.patientEmail,
            questionnaireId: req.body.questionnaireId,
            readOnly: req.body.readOnly,
            message: req.body.message,
            shareSection: visibleSection,
            sortBy: req.body.sortBy,
        });

        newShare.save(function (err, createdShare) {
            if (!err) {
                sendInvitationEmail(createdShare)
                    .then((emailRes) => {
                        if (emailRes.success) {
                            res.status(200).json(emailRes);
                        } else {
                            res.status(400).json("Unknown Error");
                        }
                    })
                    .catch((emailRej) => {
                        if (emailRej.success) {
                            res.status(200).json(emailRes);
                        } else {
                            res.status(400).json("Unknown Error");
                        }
                    });
            } else {
                res.status(400).json(err);
            }
        });
    }else{
        res.status(401).json("Authroisation faiiled");
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to get ShareDetails using ShareId
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getShareDetails = function (req, res) {
    let shareId = req.params.shareId;

    Share.findOne({ shareId }, function (err, share) {
        if (!err && share != null) {
            res.status(200).json({
                message: "Valid ShareId",
                data: share,
            });
        } else {
            res.status(400).json({
                message: "Invalid ShareId",
                data: err,
            });
        }
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is called when share response is completed.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const completeShare = async function (req, res) {
    let questionnaireData = req.body.questionnaireData;
    let clinicianEmail = req.body.clinicianEmail;
    let personalDetails = req.body.personalDetails;
    let questionnaireId = req.body.questionnaireId;
    let comments = req.body.comments;
    let sortBy  = req.body.sortBy;
    try {
        const emailResponse = await sendResultsEmail(
            questionnaireId,
            questionnaireData,
            clinicianEmail,
            personalDetails,
            sortBy,
            req.params.shareId,
            comments
        )
            
        deleteShare(req, res); 
        res.status(200).json(emailResponse);
    }catch(error){
        res.status(400).json(error);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to delete the share from our database.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const deleteShare = function (req, res) {
    const shareId = req.params.shareId;
    Share.deleteOne({ shareId: shareId });
};

module.exports.sendResultsEmail = sendResultsEmail;
module.exports.deleteShare = deleteShare;
module.exports.completeShare = completeShare;
module.exports.getShareDetails = getShareDetails;
module.exports.shareQuestionnaire = shareQuestionnaire;
