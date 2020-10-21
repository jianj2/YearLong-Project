////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');

/**
 * =============================================================================
 * SCHEMA OF ADMIN (WITH MONGOOSE)
 * =============================================================================
 * @date created: 11 Oct 2020
 * @authors: Uvin Abeysinghe
 *
 * The models/admin.js is used for keeping track fo admin users.
 */

const adminSchema = mongoose.Schema({
    username: { type: String, required:true, trim:true},
    email: {type: String, required:true, unique:true },
    password : {type: String, required:true, unique:true },
});

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.model('admin', adminSchema);