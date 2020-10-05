/**
 * ========================================
 * DEFINING ADMIN API CALLS CONTROLLER
 * ========================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The admin_controller is used for defining the functionality of api calls related to admin.
 *
 */

const mongoose = require("mongoose");
const adminKeyFile = require("../config/admin.json");
const jwt = require("jsonwebtoken");

const Clinician = mongoose.model("clinician");
const Instruction = mongoose.model("instruction");

// Login check.
const loginAdmin = function (req, res) {
    console.log("admin file", adminKeyFile);
    console.log(req.body);

    let _username = adminKeyFile.username;
    let _password = adminKeyFile.password;
    let username = req.body.username;
    let password = req.body.password;

    console.log("admin file _username", _username);
    console.log("admin file _password", _password);

    // Username can not be empty
    if (username === "") {
        res.status(400).json({message:"Username can not be empty!"});
        return;
    }
    if (password === "") {
        res.status(400).json({message:"Password can not be empty!"});
        return;
    }
    if (username === _username && password === _password) {
        const token = jwt.sign({ username: username }, "secretLOL", {
            expiresIn: 86400, // expires in 24 hours
            //expiresIn: 100, // expires in 100 seconds FOR TESTING
        });
        res.status(200).json({
            message: {
                auth: true,
                token: token,
            }
        });
    } else {
        res.status(400).json({
            message: "Incorrect details!"
        });
    }
};

const verifyLogin = (req, res) => {
    let token = req.params.token;

    jwt.verify(token, "secretLOL", function (err, decoded) {
        if (!err) {
            res.status(200).json({
                auth: true,
                decoded: decoded.username,
            });
        } else {
            res.status(401).json({
                auth: false,
                decoded: "",
            });
        }
    });
};

//Get all instructions
const getSpecificInstruction = function (req, res) {

    Instruction.findOne({ type: req.params.instructionType }, function (
        err,
        instruction
    ) {
        if (!err && instruction != null) {
            res.status(200).json(instruction);
        } else {
            res.status(400).json(err);
        }
    });
};

//get summary for all instructions including type and title

const getInstructionsSummary = function (req, res) {
    Instruction.find({}, function (err, instructions) {
        if (!err && instructions != null) {
            const filteredInstructions = instructions.filter(
                (instruction) => instruction.type != null
            );
            const summary = filteredInstructions.map((instruction) => {
                return {
                    title: instruction.title,
                    type: instruction.type,
                };
            });
            res.status(200).json(summary);
        } else {
            res.status(400).json(err);
        }
    });
};

//Update the instruction based on type
const updateInstructionByType = function (req, res) {
    console.log("updated", req.body);

    let type = req.body.instruction.type;
    

    Instruction.replaceOne(
        {type: type},
        req.body.instruction,
        (err, raw) => {
            if (!err) {

                res.status(200).json("Successfully updated instruction.");
                
              
            } else {
                res.status(400).json(err);
            }
        }
    );
};
const getOrganisations = function (req, res) {
    Clinician.find({}, function (err, clinicians) {
        if (!err && clinicians != null) {
            const filteredClinicians = clinicians.filter(
                (clinician) => clinician.organisation != null && clinician.organisation.trim() != ""
            );
            const summary = filteredClinicians.map((clinician) => {
                return {
                    organisation: clinician.organisation.toLowerCase(),
                    clinicianId: clinician.clinicianId,
                };
            });
            res.status(200).json(summary);
        } else {
            res.status(400).json(err);
        }
    });
};
const getOrganisationClinicians = function (req, res) {
    console.log("test for getOrganisationClinicians");
    Clinician.find({}, function (err, clinicians) {
        if (!err && clinicians != null) {
            const filteredClinicians = clinicians.filter(
                (clinician) => clinician.organisation != null && clinician.organisation.toLowerCase() == req.params.organisationName
            );
            const summary = filteredClinicians.map((clinician) => {
                return {
                    organisation: clinician.organisation,
                    clinicianId: clinician.clinicianId,
                };
            });
            res.status(200).json(summary);
        } else {
            res.status(400).json(err);
        }
    });
};



module.exports.loginAdmin = loginAdmin;
module.exports.verifyLogin = verifyLogin;
module.exports.getSpecificInstruction = getSpecificInstruction;
module.exports.getInstructionsSummary = getInstructionsSummary;
module.exports.updateInstructionByType = updateInstructionByType;
module.exports.getOrganisations = getOrganisations;
module.exports.getOrganisationClinicians = getOrganisationClinicians;