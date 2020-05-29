/**
 * ============================================
 * DEFINING QUESTIONNAIRE API CALLS CONTROLLER
 * ============================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The questionnaire_controller is used for defining the functionality of api calls related to questionnaires.
 *
 */

const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");

const Questionnaire = mongoose.model("questionnaire");

// Get all questionnaires
const getAllQuestionnaire = function (req, res) {
    Questionnaire.find(function (err, allQuestionnaires) {
        if (!err) {
            res.send(allQuestionnaires);
        } else {
            res.send(err);
        }
    });
};

// get specific questionnaire
const getQuestionnaire = function (req, res) {
    const questionnaireID = req.body.questionnaireId
    console.log(questionnaireID)
    Questionnaire.findOne({'questionnaireId':questionnaireID}, function (err, questionnaire) {
        if (!err){
            res.send(questionnaire)
        } else {
            res.send(err)
        }
    })

}

// add an empty questionnaire
const addEmptyQuestionnaire = function (req, res) {
    const uuid = uuidv1();

    let newQuestionnaire = new Questionnaire({
        questionnaireId: uuid,
        title: "awesome questionnaire",
        description: "awesome",
        sections: [],
        isStandard: req.body.isStandard,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
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
    });
};

// add a sample filled questionnaire
const addFilledQuestionnaire = function (req, res) {
    const uuid = uuidv1();
    const sections = [
        {
            title: "Speech",
            scenarios: [
                {
                    description: "You are at Melbourne Uni...",
                    questions: [
                        {
                            isMCQ: false,
                            rangeOptions: ["Zero", "Ten"],
                        },{
                            description: "If only one option can be true, which of the following is correct?",
                            isMCQ: true,
                            mcqOptions: ["All of the above is true", " Those below the below is true",
                             "None of the above is true", 'Those above the above is true']
                        }
                    ],
                },
            ],
        },
        { title: "Spatial", scenarios: [] },
        { title: "Quality", scenarios: [] },
    ];
    let newQuestionnaire = new Questionnaire({
        questionnaireId: uuid,
        title: "awesome questionnaire",
        description: "awesome",
        sections: sections,
        isStandard: req.body.isStandard,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
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
    });
};

// edit a questionnaire
// TODO: Receive an actual questionnaire from req.body, rather than creating a boiler plate.
const editQuestionnaire = function(req, res){
    console.log("editing questionnaire", req.body.questionnaireId);
    const sections = [    {
        title: "Speech",
        scenarios: [
            {
                description: "You are at Melbourne Uni...",
                questions: [
                    {
                        isMCQ: false,
                        rangeOptions: ["Zero", "Ten"],
                    },{
                        description: "If only one option can be true, which of the following is correct?",
                        isMCQ: true,
                        mcqOptions: ["All of the above is true", " Those below the below is true",
                         "None of the above is true", 'Those above the above is true']
                    }
                ],
            },
        ],
    },
    { title: "Spatial", scenarios: [] },
    { title: "Quality", scenarios: [] },
]
    editedQuestionnaire = {
        questionnaireId: req.body.questionnaireId,
        title: "awesome questionnaire",
        description: "no longer awesome",
        sections: sections,
        isStandard: false,
    };
  

    Questionnaire.replaceOne({questionnaireId: req.body.questionnaireId}, editedQuestionnaire, (err,raw)=>{return;});
    


}

// Maybe used later for making incremental changes in db.
const editQuestionnaireQuestion = function(req, res){
    console.log("editing questionnaire");

    //   const writeResult = Questionnaire.updateOne({questionnaireId: req.body.questionnaireId}, {$addToSet: {"sections": {title: "new section 26",
    //      scenarios: [] }} }, (err, raw) => {console.log(err, raw);});
  Questionnaire.updateOne({questionnaireId: req.body.questionnaireId}, {$push: {"sections.0.scenarios.0.questions": {isMCQ: false,
        rangeOptions: ["Three", "Nine"] }} }, (err, raw) => {return});


}

// Delete questionnaire
const deleteQuestionnaire = function (req, res) {
    const questionnaireId = req.body.questionnaireId;
    Questionnaire.deleteOne({ questionnaireId: questionnaireId }, function (err, result)
    {
        //console.log("deleted customised questionnaire: " + questionnaireId);
        if (!err){
            res.send('successfully delete')
        } else {
            res.send(err)
        }
    });
};

module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.addEmptyQuestionnaire = addEmptyQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;
module.exports.addFilledQuestionnaire = addFilledQuestionnaire;
module.exports.editQuestionnaire = editQuestionnaire;
module.exports.getQuestionnaire = getQuestionnaire;

