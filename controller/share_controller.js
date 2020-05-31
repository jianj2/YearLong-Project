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


// Create a new share.
var share = function (req,res) {
    let newShare = new Share({
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

module.exports.share = share;
