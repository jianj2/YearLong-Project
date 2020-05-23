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
    console.log(req.body)
    const questionnaireId  = req.body.questionnaireId;
    let newQuestionnaire = new Questionnaire ({
        questionnaireId: questionnaireId,
        title: "awesome questionnaire",
        description: "awesome",
        questions: [],
        isStandard: true
    } );
    newQuestionnaire.save(function(err, createdQuestionnaire){

        console.log('right here')
        res.send({
            code: 200,
            message: "successfully add new questionnaire!",
        });

    });
    // res.send({code: 200,
    //     message: "successfully add new questionnaire!"})
};


let delQuestionnaire = function (req, res) {
    const questionnaireID = req.body.questionnaireId;
    Questionnaire.deleteOne({questionnaireId:questionnaireID},function (err,result) {
        console.log('del now')
        
    })

}


module.exports.getAllQuestionnaire = getAllQuestionnaire;
module.exports.addNewQuestionnaire = addNewQuestionnaire;
module.exports.delQuestionnaire = delQuestionnaire;