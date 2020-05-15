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
    description: {type: String, required:true},
    isMCQ: Boolean,
    mcqOptions: [String],
    rangeOptions: [String],
    location: {
        section: String,
        index: Number
    }
});


const questionnaireSchema = mongoose.Schema({
    questionnaireId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    questions: [questionSchema],
    isStandard: Boolean,
});

module.exports = mongoose.model('questionnaire', questionnaireSchema);