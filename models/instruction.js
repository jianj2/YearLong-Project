/**
 * =============================================================================
 * SCHEMA OF Instruction (WITH MONGOOSE)
 * =============================================================================
 * @date created: 17 August 2020
 * @authors: Guang Yang
 *
 * The models/instruction.js is used for establishing the 'instruction' schema and types using mongoose.
 */

const mongoose = require('mongoose');

const instructionSchema = mongoose.Schema({
    title:{type: String, required:true},
    type:{type: String, required:false},
    content:{type: String, required:true},
});

module.exports = mongoose.model('instruction', instructionSchema);