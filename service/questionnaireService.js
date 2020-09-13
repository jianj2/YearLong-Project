/**
 * ============================================
 * DEFINING QUESTIONNAIRE SERVICE
 * ============================================
 * @date created: 13 Sep 2020
 * @authors: Cary Jin
 *
 * The questionnaire service handles the domain logic
 *  related to adding/removing/updating questionnaires
 *
 */

const mongoose = require("mongoose");
const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");

// find all questiionnaires that belong to the clinician with clinicianId
const findQuestionnaireForClinician = (clinicianId, res) => {
    Clinician.findOne({ clinicianId: clinicianId }, async function (
        err,
        clinician
    ) {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            const questionnaires = await Questionnaire.find()
                .where("questionnaireId")
                .in(questionnaireIds)
                .exec();
            res.send(questionnaires);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

// generate an almost empty questionnaire with uuid.
const generateNewCustomisedQuestionnaire = (uuid) => {
    return new Questionnaire({
        questionnaireId: uuid,
        title: "New Questionnaire",
        description: "Please click edit to begin with this questionnaire.",
        isSSQ_Ch: true,
        sections: [
            {
                title: "Section 1 - Speech",
                scenarios: [
                    {
                        description: "You are at Melbourne Uni...",
                        questions: [
                            {
                                isMCQ: false,
                                rangeOptions: ["Zero", "Ten"],
                            },
                            {
                                description:
                                    "If only one option can be true, which of the following is correct?",
                                isMCQ: true,
                                MCQOptions: [
                                    "All of the above is true",
                                    " Those below the below is true",
                                    "None of the above is true",
                                    "Those above the above is true",
                                ],
                            },
                        ],
                    },
                ],
            },
            { title: "Section 2 - Spatial", scenarios: [] },
            { title: "Section 3 - Quality", scenarios: [] },
        ],
        isStandard: false,
    });
};

//generates a questionnaire template for a standard one with uuid.
const generateNewStandardisedQuestionnaire = (uuid) => {
    return new Questionnaire({
        questionnaireId: uuid,
        title: "New Standard Questionnaire",
        description: "Please click edit to begin with this questionnaire.",
        isSSQ_Ch: true,
        sections: [
            { title: "Section 1 - Speech", scenarios: [] },
            { title: "Section 2 - Spatial", scenarios: [] },
            { title: "Section 3 - Quality", scenarios: [] },
        ],
        isStandard: true,
    });
};

// generates a new questionnaire with given content and fields
const generateCopy = (copiedQuestionnaire, questionnaireId, isStandard) => {
    return new Questionnaire({
        ...copiedQuestionnaire,
        questionnaireId,
        isStandard,
        title: copiedQuestionnaire.title + " - Copy",
    });
};

// insert a questionnaireId to the clincian's list of customised questionnaires
const attachQuestionnaireToClinician = (uuid, clinicianId, res) => {
    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $push: { questionnaires: uuid } },
        (err, raw) => {
            if (!err) {
                console.log("added customised questionnaire:", uuid);

                res.send({
                    code: 200,
                    message: "successfully add new questionnaire!",
                    uuid: uuid,
                });
            } else {
                res.send(
                    JSON.stringify(
                        "Customised Questionnaire cannot be created."
                    )
                );
            }
        }
    );
};

// update a questionnaire with the id and content provided.
const updateQuestionnaireOnDatabase = (
    questionnaireId,
    editedQuestionnaire,
    res
) => {
    Questionnaire.replaceOne(
        { questionnaireId: questionnaireId },
        editedQuestionnaire,
        (err, raw) => {
            if (!err) {
                res.send(JSON.stringify("successfully edited"));
            } else {
                res.send(JSON.stringify(err));
            }
        }
    );
};

// remove a questionnaire id from the clincian's list of customised questionnaires
const detachQuestionnaireFromClinician = (questionnaireId, clinicianId) => {
    Clinician.updateOne(
        { clinicianId },
        { $pull: { questionnaires: questionnaireId } },
        (err, raw) => {
            return;
        }
    );
};

// delete a questionnaire with given id, and remove it from the clinician's list, if it is customised.
const deleteQuestionnaireFromDatabase = (questionnaireId, clinicianId, res) => {
    Questionnaire.deleteOne({ questionnaireId }, function (err, result) {
        console.log("deleted questionnaire: " + questionnaireId);
        if (!err) {
            // questionnaire is customised
            if (clinicianId !== "") {
                detachQuestionnaireFromClinician(questionnaireId, clinicianId);
            }
            let message = JSON.stringify(
                `successfully deleted standard questionnaire ${questionnaireId}`
            );
            res.send(message);
        } else {
            res.send(JSON.stringify(err));
        }
    });
};

module.exports.findQuestionnaireForClinician = findQuestionnaireForClinician;
module.exports.generateNewCustomisedQuestionnaire = generateNewCustomisedQuestionnaire;
module.exports.generateNewStandardisedQuestionnaire = generateNewStandardisedQuestionnaire;
module.exports.generateCopy = generateCopy;
module.exports.attachQuestionnaireToClinician = attachQuestionnaireToClinician;
module.exports.updateQuestionnaireOnDatabase = updateQuestionnaireOnDatabase;
module.exports.deleteQuestionnaireFromDatabase = deleteQuestionnaireFromDatabase;
