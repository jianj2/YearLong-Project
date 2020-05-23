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

let addNewQuestionnaire = function (req, res) {

    const questionnaireId  = req.body.questionnaireId;
    let newQuestionnaire = new Questionnaire ({
        questionnaireId: "cdefgh",
         title: "awesome questionnaire",
         description: "awesome",
         questions: [],
        isStandard: true


    } );
    newQuestionnaire.save();
    console.log('POST request '+questionnaireId );
    //res.send("New Questionnaire created");

    res.status(200).json({"message":"New Questionnaire created"});
  };


module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.addNewQuestionnaire = addNewQuestionnaire;