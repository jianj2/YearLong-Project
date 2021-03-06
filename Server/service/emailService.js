////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const nodemailer = require("nodemailer");
const path = require("path");
const { generateAttachments } = require("./reportService");

/**
 * =============================================================================
 * DEFINING EMAIL CONTROLLER
 * =============================================================================
 * @date created: 26 August 2020
 * @authors: Waqas Rehmani
 *
 * The email service is used for handling all of email
 * requests.
 *
 */

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Define Transporter
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:
            process.env.GMAILUSERNAME ||
            require(path.join(__dirname, "..", "config/keys")).GmailUserName,
        pass:
            process.env.GMAILPASSWORD ||
            require(path.join(__dirname, "..", "config/keys")).GmailPassword,
    },
});

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to send questionnaire link through email.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sendInvitationEmail = (createdShare) => {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {
        const {patientEmail} = createdShare;
        let client = process.env.CLIENT || "http://localhost:3000";
        let link = client + "/participant/" + createdShare.shareId + "";
        let message = "";
        if (createdShare.message !== undefined && createdShare.message !== "") {
            message =
                "Message from the clinician: " + createdShare.message + "";
        }
        const ejs = require("ejs");
        ejs.renderFile(
            __dirname + "/sendInvitationEmailTemplate.ejs",
            { link: link, message: message },
            function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var mailOptions = {
                        from: '"SSQ" noreply.ssq@gmail.com',
                        to: patientEmail,
                        subject:
                            "You are invited to complete the following questionnaire.",
                        html: data,
                    };

                    // Resolves this promise if sendEmail promise is resolved.
                    // Rejects this promise if sendEmail promise is rejected.
                    sendEmail(mailOptions)
                        .then((res) => resolve(res))
                        .catch((rej) => reject(rej));
                }
            }
        );
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to send the results PDF report through email.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sendResultsEmail = (
    questionnaireId,
    questionnaireData,
    clinicianEmail,
    personalDetails,
    sortBy,
    shareId,
    comments
) => {
    // The promise resolves if email is sent successfully, and rejects if email fails.
    return new Promise((resolve, reject) => {
        const ejs = require("ejs");
        ejs.renderFile(
            __dirname + "/sendResultEmailTemplate.ejs",
            { name: personalDetails.name },
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    var mailOptions = {
                        from: '"SSQ" noreply.ssq@gmail.com',
                        to: clinicianEmail,
                        subject:
                            "Questionnaire completed for " +
                            personalDetails.name +
                            ".",
                        html: data,
                    };

                    generateAttachments(
                        questionnaireId,
                        personalDetails,
                        questionnaireData,
                        shareId,
                        sortBy,
                        comments,
                        clinicianEmail
                    )
                        .then((attachments) => {
                            mailOptions.attachments = attachments;
                            // Resolves this promise if sendEmail promise is resolved.
                            // Rejects this promise if sendEmail promise is rejected.
                            sendEmail(mailOptions)
                                .then((res) => resolve(res))
                                .catch((rej) => reject(rej));
                        })
                        .catch((reportRejected) =>
                            reject({
                                success: false,
                                details: reportRejected.error,
                            })
                        );
                }
            }
        );
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to send the email.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const sendEmail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({
                    success: false,
                    details: error,
                });
            } else {
                resolve({
                    success: true,
                    details: info,
                });
            }
        });
    });
};


////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = {
    sendInvitationEmail,
    sendResultsEmail
}

