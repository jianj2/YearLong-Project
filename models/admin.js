/**
 * =======================================
 * SCHEMA OF ADMIN (WITH MONGOOSE)
 * =======================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The models/admin.js is used for establishing the 'admin' schema and types using mongoose.
 */

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminId: { type: String, required:true, lowercase:true, unique:true, trim:true},
    name: { type: String, required:true, trim:true},
    username: { type: String, required:true, trim:true},
    email: {type: String, required:true, unique:true },
    password: { type: String, required:true, unique:true },
    questionnaires: [String],
});

module.exports = mongoose.model('admin', adminSchema);