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
const { v1: uuidv1 } = require('uuid');




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
    const uuid = uuidv1();
    
    let newQuestionnaire = new Questionnaire ({
        questionnaireId: uuid,
        title: "awesome questionnaire",
        description: "awesome",
        questions: [],
        isStandard: true
    } );
    newQuestionnaire.save(function(err, createdQuestionnaire){
        console.log("added customised questionnaire:", uuid, JSON.stringify(req.body));
      
        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
            uuid: uuid 
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