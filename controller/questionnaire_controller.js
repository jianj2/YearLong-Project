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


const mongoose = require('mongoose');

var Questionnaire = mongoose.model('questionnaire');

// Get all questionnaires
var getAllQuestionnaire = function (req, res) {
    Questionnaire.find(function(err, allQuestionnaires){
        if(!err){
            res.send(allQuestionnaires);
        } else {
            res.send(err);
        }
    });
};

// Get a questionnaire
var getQuestionnaire = function (req, res) {
    let questionnaireId = req.params.questionnaireId;

    Questionnaire.findOne({ questionnaireId }, function (
        err,
        questionnaire
    ) {
        if (!err) {
            res.send(questionnaire);
        } else {
            res.send(err);
        }
    });
};


module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.getQuestionnaire = getQuestionnaire;