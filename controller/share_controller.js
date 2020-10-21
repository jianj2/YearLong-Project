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
const { extractUserEmail } = require("../utils/jwtUtils");
const {
    sendInvitationEmail,
    sendResultsEmail,
} = require("../service/emailService");
const {
    deleteShare,
    findShareById,
    createShare,
    saveShare,
} = require("../service/shareService");
const { sendJSONResponse } = require("../utils/apiUtils");

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to create a new share.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const shareQuestionnaire = async (req, res) => {
    const userEmail = extractUserEmail(req);
    const clinicianEmail = req.body.clinicianEmail;

    if (clinicianEmail === userEmail) {
        const newShare = createShare(req.body);
        const error = await saveShare(newShare);
        if (error) {
            res.status(400).json(error);
        } else {
            const emailRes = await sendInvitationEmail(newShare);
            if (emailRes.success) {
                res.status(200).json(emailRes);
            } else {
                res.status(400).json("Unknown Error");
            }
        }
    } else {
        res.status(401).json("Authorisation faiiled");
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to get ShareDetails using ShareId
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getShareDetails = async (req, res) => {
    const shareId = req.params.shareId;
    const [err, foundShare] = await findShareById(shareId);
    sendJSONResponse(res, foundShare, err, 404);
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is called when share response is completed.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const completeShare = async (req, res) => {
    try {
        const emailResponse = await sendResultsEmail(
            req.body.questionnaireId,
            req.body.questionnaireData,
            req.body.clinicianEmail,
            req.body.personalDetails,
            req.body.sortBy,
            req.params.shareId,
            req.body.comments
        );
        //const err = await deleteShare(req.params.shareId);
        if (!err) {
            res.status(200).json(emailResponse);
        } else {
            res.status(400).json(err);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports.sendResultsEmail = sendResultsEmail;
module.exports.deleteShare = deleteShare;
module.exports.completeShare = completeShare;
module.exports.getShareDetails = getShareDetails;
module.exports.shareQuestionnaire = shareQuestionnaire;
