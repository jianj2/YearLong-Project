/**
 * =======================================
 * SCHEMA OF SHARE (WITH MONGOOSE)
 * =======================================
 * @date created: 31 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The models/share.js is used for establishing the 'share' schema and types using mongoose.
 */

const mongoose = require('mongoose');

const visibleSections = mongoose.Schema({
    title: {type: String, required: true },
    isVisible:{type:Boolean, required:true},
});

const shareSchema = mongoose.Schema({
    shareId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    clinicianEmail: {type: String, required:true},
    patientEmail: {type: String},
    questionnaireId: {type: String, required:true },
    readOnly:{type:Boolean, required:true},
    message:{type:String},
    shareSection:[visibleSections],
    sortBy: {type:Boolean, required:true},
});



module.exports = mongoose.model('share', shareSchema);
