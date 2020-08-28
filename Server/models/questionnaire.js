/**
 * =======================================
 * SCHEMA OF QUESTIONNAIRE (WITH MONGOOSE)
 * =======================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The models/questionnaire.js is used for establishing the 'questionnaire' schema and types using mongoose.
 */


const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    description: String,
    isMCQ: Boolean,
    MCQOptions: [String],
    rangeOptions: [String]
});


const scenarioSchema = mongoose.Schema({
    description: {type: String, required:true} ,
    questions: [questionSchema]

})

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    scenarios: [scenarioSchema]
});



const questionnaireSchema = mongoose.Schema({
    questionnaireId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    sections: [sectionSchema],
    isStandard: Boolean,
    isSSQ_Ch: {type: Boolean, required: false},
});

module.exports = mongoose.model('questionnaire', questionnaireSchema);