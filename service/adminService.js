/**
 * ============================================
 * DEFINING ADMIN SERVICE
 * ============================================
 * @date created: 5 Oct 2020
 * @authors: Cary
 *
 * The admin service handles the domain and data
 * source logic related to standard instructions,
 * clinician information and any other data that
 * can be viewed or managed by admins.
 */

const mongoose = require("mongoose");
const Instruction = mongoose.model("instruction");

const findInstructionByType = async (type) => {
    try {
        const foundInstruction = await Instruction.findOne({ type: type });
        return Promise.resolve([undefined, foundInstruction]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const findAllInstructions = async () => {
    try {
        const foundInstructions = await Instruction.find({});
        return Promise.resolve([undefined, foundInstructions]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
} 

const updateInstructionInDatabase = async (instruction) => {
    try {
        console.log(instruction);
        await Instruction.replaceOne({ type: instruction.type}, instruction);
        return Promise.resolve([undefined, "Successfully updated instruction"]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
} 

module.exports.findInstructionByType = findInstructionByType;
module.exports.findAllInstructions = findAllInstructions;
module.exports.updateInstructionInDatabase = updateInstructionInDatabase;
