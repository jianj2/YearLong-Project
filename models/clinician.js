/**
 * =============================================================================
 * SCHEMA OF CLINICIAN (WITH MONGOOSE)
 * =============================================================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The models/clinician.js is used for establishing the 'clinician' schema and types using mongoose.
 */

const mongoose = require('mongoose');

const clinicianSchema = mongoose.Schema({
    clinicianId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    name: { type: String, required:true, trim:true},
    email: {type: String, required:true, unique:true },
    country : {type:String},
    organisation : {type:String},
    questionnaires: [String],
});

module.exports = mongoose.model('clinician', clinicianSchema);