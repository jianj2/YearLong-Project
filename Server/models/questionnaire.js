////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');

/**
 * =============================================================================
 * SCHEMA OF QUESTIONNAIRE (WITH MONGOOSE)
 * =============================================================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The models/questionnaire.js is used for establishing the 'questionnaire' schema and types using mongoose.
 */

const questionSchema = mongoose.Schema({
    description: String,
    isMCQ: Boolean,
    MCQOptions: [String],
    rangeOptions: [String]
}, );

questionSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
})

const scenarioSchema = mongoose.Schema({
    description: {type: String} ,
    questions: [questionSchema]
})

scenarioSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
})

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    scenarios: [scenarioSchema]
});

sectionSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
})

const questionnaireSchema = mongoose.Schema({
    questionnaireId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    title: {type: String, required:true},
    description: {type: String},
    sections: [sectionSchema],
    sectionNames: [String],
    isStandard: Boolean,
    isSSQ_Ch: {type: Boolean, required: false},
    updateDate: {type: String, required: true}
});

questionnaireSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
    }
})

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.model('questionnaire', questionnaireSchema);
