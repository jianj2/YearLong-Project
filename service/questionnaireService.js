/**
 * ============================================
 * DEFINING QUESTIONNAIRE SERVICE
 * ============================================
 * @date created: 13 Sep 2020
 * @authors: Cary Jin
 *
 * The questionnaire service handles the domain and datasource
 * logic related to adding/removing/updating questionnaires. 
 *
 */
const { v1: uuidv1 } = require("uuid");

const mongoose = require("mongoose");
const { SSQ_CH, SSQ_P } = require("../questionnaires/SSQ_content");
const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");

const findQuestionnaireById = async (questionnaireId) => {
    try {
        const questionnaire = await Questionnaire.findOne({ questionnaireId });
        // throw Error("My Error");
        if (questionnaire != null ){
            return await new Promise((resolve, reject) => {
                resolve([undefined, questionnaire]);
             });
        }else{
           throw Error("The questionnaire does not exist");
        }
        
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// find all questiionnaires that belong to the clinician with clinicianId
const findQuestionnaireForClinician = async (clinicianId) => {
    try {
        const clinician = await Clinician.findOne({ clinicianId: clinicianId });
        const questionnaireIds = clinician.questionnaires;
        const questionnaires = await Questionnaire.find()
            .where("questionnaireId")
            .in(questionnaireIds)
            .exec();
        const result = await new Promise((resolve, reject) => {
            resolve([undefined, questionnaires]);
        });

        return result;
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// find all standardised questionnaires
const findStandardisedQuestionnaires = async () => {
    try {
        const questionnaires = await Questionnaire.find({ isStandard: true });
        const result = await new Promise((resolve, reject) => {
            resolve([undefined, questionnaires]);
        });
        return result;
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// generate an almost empty questionnaire with uuid.
const generateNewCustomisedQuestionnaire = (uuid) => {
    return new Questionnaire({
        questionnaireId: uuid,
        title: "New Questionnaire",
        description: "Please click edit to begin with this questionnaire.",
        isSSQ_Ch: true,
        updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}),
        sections: [
            { title: "Section A - Speech", scenarios: [] },
            { title: "Section B - Spatial", scenarios: [] },
            { title: "Section C - Quality", scenarios: [] },
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
        updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}),
        sections: [
            { title: "Section A - Speech", scenarios: [] },
            { title: "Section B - Spatial", scenarios: [] },
            { title: "Section C - Quality", scenarios: [] },
        ],
        isStandard: true,
    });
};

//generates a complete standard questionnaire template for parents with uuid.
const generateCompleteParentQuestionnaire = (uuid) => {
    return new Questionnaire({
        questionnaireId: uuid,
        title: "Standard Questionnaire For Parent",
        description: "Complete Questionnaire.",
        isSSQ_Ch: false,
        updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}),
        sections: SSQ_P,
        isStandard: true,
    });
};

//generates a complete standard questionnaire template for children with uuid.
const generateCompleteChildQuestionnaire = (uuid) => {
    return new Questionnaire({
        questionnaireId: uuid,
        title: "Standard Questionnaire For Child",
        description: "Complete Questionnaire.",
        isSSQ_Ch: true,
        updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}),
        sections: SSQ_CH,
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
        updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"}),
    });
};

// insert a questionnaireId to the clincian's list of customised questionnaires
const attachQuestionnaireToClinician = async (uuid, clinicianId) => {
    try {
        await Clinician.updateOne(
            { clinicianId: clinicianId },
            { $push: { questionnaires: uuid } }
        );
        return Promise.resolve([err, "successfully add new questionnaire!"]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// Save a new customised questionnaire belonging to clincianId and return a message
const saveNewCustomisedQuestionnaire = async (
    newQuestionnaire,
    clinicianId
) => {
    try {
        await newQuestionnaire.save();
        return await attachQuestionnaireToClinician(
            newQuestionnaire.questionnaireId,
            clinicianId
        );
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// Save a new standardised questionnaire belonging to admin
const saveNewStandardisedQuestionnaire = async (newQuestionnaire) => {
    try {
        await newQuestionnaire.save();
        return Promise.resolve([
            undefined,
            "Added standardised questionnaire.",
        ]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// update a questionnaire with the id and content provided.
const updateQuestionnaireOnDatabase = async (
    questionnaireId,
    editedQuestionnaire
) => {
    // generates a new questionnaire with given content and fields
    // const editedQuestionnaireWithDate = new Questionnaire({
    //     ...editedQuestionnaire,
    //     updateDate: (new Date()).toLocaleString(),
    // });

    try {
        await Questionnaire.replaceOne(
            { questionnaireId: questionnaireId },
            {
                ...editedQuestionnaire,
                updateDate: new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"})
            }
        );
        return Promise.resolve([undefined, "Updated questionnaire."]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const editCustomisedQuestionnaire = async (
    userEmail,
    questionnaireId,
    editedQuestionnaire
) => {
    try {
        const clinician = await Clinician.findOne({ clinicianId: userEmail });
        const questionnaireIds = clinician.questionnaires;
        if (questionnaireIds.includes(questionnaireId)) {
            return await updateQuestionnaireOnDatabase(
                questionnaireId,
                editedQuestionnaire,
            );
        } else {
            throw Error(
                "The edited questionnaire does not belong to the clinician."
            );
        }
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// remove a questionnaire id from the clincian's list of customised questionnaires
const detachQuestionnaireFromClinician = async (
    questionnaireId,
    clinicianId
) => {
    try {
        await Clinician.updateOne(
            { clinicianId },
            { $pull: { questionnaires: questionnaireId } }
        );
        return Promise.resolve([
            undefined,
            "Successfully deleted questionnaire",
        ]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const deleteCustomisedQuestionnaireFromDatabase = async (
    questionnaireId,
    userEmail,
    clinicianId
) => {
    try {
        const clinician = await Clinician.findOne({ clinicianId: userEmail });
        const questionnaireIds = clinician.questionnaires;
        if (questionnaireIds.includes(questionnaireId)) {
            return await deleteQuestionnaireFromDatabase(
                questionnaireId,
                clinicianId
            );
        } else {
            throw Error(
                "The questionnaire to be deleted does not belong to the clinician."
            );
        }
    } catch (error){
        return Promise.resolve([error, undefined]);
    }
};

// delete a questionnaire with given id, and remove it from the clinician's list, if it is customised.
const deleteQuestionnaireFromDatabase = async (
    questionnaireId,
    clinicianId
) => {
    try {
        await Questionnaire.deleteOne({ questionnaireId });
        if (clinicianId !== "") {
            return await detachQuestionnaireFromClinician(
                questionnaireId,
                clinicianId
            );
        } else {
            return Promise.resolve([
                undefined,
                "Successfully deleted questionnaire",
            ]);
        }
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const copyQuestionnaireToDatabase = async (copiedQuestionnaire,
    copyToCustomisedQuestionnaire,
    clinicianId) => {
    const uuid = uuidv1();
    try {
        const newQuestionnaire = generateCopy(
            copiedQuestionnaire,
            uuid,
            !copyToCustomisedQuestionnaire
        );
        await newQuestionnaire.save();
        if (clinicianId) {
            return attachQuestionnaireToClinician(uuid, clinicianId);
        } else {
            return Promise.resolve([
                undefined,
                "Successfully copied questionnaire",
            ]);
        }
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

module.exports.findQuestionnaireById = findQuestionnaireById;
module.exports.findQuestionnaireForClinician = findQuestionnaireForClinician;
module.exports.findStandardisedQuestionnaires = findStandardisedQuestionnaires;
module.exports.generateNewCustomisedQuestionnaire = generateNewCustomisedQuestionnaire;
module.exports.generateNewStandardisedQuestionnaire = generateNewStandardisedQuestionnaire;
module.exports.generateCompleteParentQuestionnaire = generateCompleteParentQuestionnaire;
module.exports.generateCompleteChildQuestionnaire = generateCompleteChildQuestionnaire;
module.exports.generateCopy = generateCopy;
module.exports.copyQuestionnaireToDatabase = copyQuestionnaireToDatabase;
module.exports.attachQuestionnaireToClinician = attachQuestionnaireToClinician;
module.exports.saveNewCustomisedQuestionnaire = saveNewCustomisedQuestionnaire;
module.exports.saveNewStandardisedQuestionnaire = saveNewStandardisedQuestionnaire;
module.exports.updateQuestionnaireOnDatabase = updateQuestionnaireOnDatabase;
module.exports.editCustomisedQuestionnaire = editCustomisedQuestionnaire;
module.exports.deleteCustomisedQuestionnaireFromDatabase = deleteCustomisedQuestionnaireFromDatabase;
module.exports.deleteQuestionnaireFromDatabase = deleteQuestionnaireFromDatabase;