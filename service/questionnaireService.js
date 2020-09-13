const mongoose = require("mongoose");
const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");

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

const generateNewCustomisedQuestionnaire = (uuid) =>{
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
} 

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
}

// update specific clinician questionnaire
const attachQuestionnaireToClinician = (uuid, clinicianId) => {
    Clinician.updateOne(
        { clinicianId: clinicianId },
        { $push: { questionnaires: uuid } },
        (err, raw) => {
            if(!err){
                console.log(
                    "added customised questionnaire:",
                    uuid,
                    JSON.stringify(req.body)
                );
    
                res.send({
                    code: 200,
                    message: "successfully add new questionnaire!",
                    uuid: uuid,
                });
            }else{
                res.send(JSON.stringify("Customised Questionnaire cannot be created."));
            }
            
        }
    );
}


module.exports.findQuestionnaireForClinician = findQuestionnaireForClinician;
module.exports.generateNewCustomisedQuestionnaire = generateNewCustomisedQuestionnaire;
module.exports.attachQuestionnaireToClinician = attachQuestionnaireToClinician;
module.exports.generateNewStandardisedQuestionnaire = generateNewStandardisedQuestionnaire;