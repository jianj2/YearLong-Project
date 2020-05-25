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

var addNewQuestionnaire = function (req, res) {

    const questionnaireId  = req.body.questionnaireId;
    let newQuestionnaire = new Questionnaire ({
        questionnaireId: questionnaireId,
        title: "awesome questionnaire",
        description: "awesome",
        questions: [],
        isStandard: true
    } );
    newQuestionnaire.save(function(err, createdQuestionnaire){
        console.log("added customised questionnaire: " + JSON.stringify(req.body));
      
        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
        });

    });
  
  };



let deleteQuestionnaire = function (req, res) {
    const questionnaireId = req.body.questionnaireId;
    Questionnaire.deleteOne({questionnaireId:questionnaireId},function (err,result) {
        console.log('deleted customised questionnaire: ' + questionnaireId );
        
    })

}


module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.addNewQuestionnaire = addNewQuestionnaire;
module.exports.deleteQuestionnaire = deleteQuestionnaire;