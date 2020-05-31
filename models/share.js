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

const shareSchema = mongoose.Schema({
    shareId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    clinicianEmail: {type: String, required:true},
    patientEmail: {type: String, required:true},
    questionnaireId: {type: String, required:true },
});

module.exports = mongoose.model('share', shareSchema);
