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

const findQuestionnairebyId = (questionnaireId) => {
    Questionnaire.findOne({ questionnaireId }, function (err, questionnaire) {
        return {err, questionnaire};
    });
}

// find all questiionnaires that belong to the clinician with clinicianId
const findQuestionnaireForClinician = (clinicianId) => {
    Clinician.findOne({ clinicianId: clinicianId }, async function (
        err,
        clinician
    ) {
        let questionnaires = null;
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            questionnaires = await Questionnaire.find()
                .where("questionnaireId")
                .in(questionnaireIds)
                .exec();
           
        }
        return {err, questionnaires};
    });
};

const findStandardisedQuestionnaires = () => { 
    Questionnaire.find({ isStandard: true }, function (err, questionnaires) {
        return {err, questionnaires};
    });
}

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
const attachQuestionnaireToClinician = (uuid, clinicianId) => {
    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $push: { questionnaires: uuid } },
        (err, raw) => {
            if (!err) {
                console.log("added customised questionnaire:", uuid);
                    return ("successfully add new questionnaire!");
                
            } else {
              return err;
            }
        }
    );
};

// Save a new customised questionnaire belonging to clincianId and return a message
const saveNewCustomisedQuestionnaire = async (newQuestionnaire, clinicianId) => {
    newQuestionnaire.save(function (err, createdQuestionnaire) {
        if (!err) {
            return attachQuestionnaireToClinician(newQuestionnaire.questionnaireId, clinicianId);
        } else {
           return  ("Customised Questionnaire cannot be created. ");
        }
    });
}

// Save a new standardised questionnaire belonging to admin
const saveNewStandardisedQuestionnaire = async (newQuestionnaire) => {
    newQuestionnaire.save(function (err, createdQuestionnaire) {
        if (!err) {
           return ("Added standardised questionnaire.");
        } else {
           return  ("Unable to add standardised questionnaire.");
        }
    });
}


// update a questionnaire with the id and content provided.
const updateQuestionnaireOnDatabase = (
    questionnaireId,
    editedQuestionnaire,
) => {
    Questionnaire.replaceOne(
        { questionnaireId: questionnaireId },
        editedQuestionnaire,
        (err, raw) => {
            if (!err) {
                return ("successfully edited");
            } else {
                return err;
            }
        }
    );
};

const editCustomisedQuestionnaire = (userEmail, questionnaireId, editedQuestionnaire) => {
    
    const validateAndUpdate = (err, clinician) => {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            if (questionnaireIds.includes(questionnaireId)) {
                return updateQuestionnaireOnDatabase(
                    questionnaireId,
                    editedQuestionnaire,
                );
            } else {
                    return(
                        "The edited questionnaire does not belong to the clinician."
                    );
            }
        } else {
          return err;
        }
    };
    Clinician.findOne({ clinicianId: userEmail }, validateAndUpdate);
}

// remove a questionnaire id from the clincian's list of customised questionnaires
const detachQuestionnaireFromClinician = (questionnaireId, clinicianId) => {
    Clinician.updateOne(
        { clinicianId },
        { $pull: { questionnaires: questionnaireId } },
        (err, raw) => {
            if (!err){
               return "";
            }else{
                return err;
            }
         
        }
    );
};

const deleteCustomisedQuestionnaireFromDatabase = async (questionnaireId, userEmail, clinicianId)=>{
    const validateAndDelete = (err, clinician) => {
        if (!err) {
            const questionnaireIds = clinician.questionnaires;
            if (questionnaireIds.includes(questionnaireId)) {
                const message = await deleteQuestionnaireFromDatabase(
                    questionnaireId, clinicianId);
                return message;
            } else {
                return ("The questionnaire to be deleted does not belong to the clinician.");
            }
        } else {
            return err;
        }
    };

    Clinician.findOne({ clinicianId: userEmail }, validateAndDelete);
}

// delete a questionnaire with given id, and remove it from the clinician's list, if it is customised.
const deleteQuestionnaireFromDatabase = async (questionnaireId, clinicianId) => {
    Questionnaire.deleteOne({ questionnaireId }, function (err, result) {
        console.log("deleted questionnaire: " + questionnaireId);
        if (!err) {
            // questionnaire is customised
            if (clinicianId !== "") {
                const detachmentMessage = await detachQuestionnaireFromClinician(questionnaireId, clinicianId);
                if (detachmentMessage !== ""){
                    return detachmentMessage;
                }
            }
            const message = `successfully deleted questionnaire ${questionnaireId}`;
            
            return message;
        } else {
            return err;
        }
    });
};

const copyQuestionnaireToDatabase = async () => {
    const newQuestionnaire = generateCopy(
        copiedQuestionnaire,
        uuid,
        !copyToCustomisedQuestionnaire
    );

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        if(clincianId){
            return attachQuestionnaireToClinician(uuid, clinicianId);
          }
       else{
           return "successfully coppiedQuestionnaire";
       }
    });

  
}

module.exports.findQuestionnairebyId = findQuestionnairebyId;
module.exports.findQuestionnaireForClinician = findQuestionnaireForClinician;
modules.exports.findStandardisedQuestionnaires = findStandardisedQuestionnaires;
module.exports.generateNewCustomisedQuestionnaire = generateNewCustomisedQuestionnaire;
module.exports.generateNewStandardisedQuestionnaire = generateNewStandardisedQuestionnaire;
module.exports.generateCopy = generateCopy;
module.exports.copyQuestionnaireToDatabase = copyQuestionnaireToDatabase;
module.exports.attachQuestionnaireToClinician = attachQuestionnaireToClinician;
module.exports.saveNewCustomisedQuestionnaire  = saveNewCustomisedQuestionnaire;
module.exports.saveNewStandardisedQuestionnaire = saveNewStandardisedQuestionnaire;
module.exports.updateQuestionnaireOnDatabase = updateQuestionnaireOnDatabase;
module.exports.editCustomisedQuestionnaire = editCustomisedQuestionnaire;
module.exports.deleteCustomisedQuestionnaireFromDatabase = deleteCustomisedQuestionnaireFromDatabase;
module.exports.deleteQuestionnaireFromDatabase = deleteQuestionnaireFromDatabase;
