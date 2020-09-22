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

const Questionnaire = mongoose.model("questionnaire");
const Clinician = mongoose.model("clinician");
const Instruction = mongoose.model("instruction");
const { v1: uuidv1 } = require("uuid");

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
        res.send({
            code: 1,
            message: "Username can not be empty!",
        });
        return;
    }
    if (password === "") {
        res.send({
            code: 2,
            message: "Password can not be empty!",
        });
        return;
    }
    if (username === _username && password === _password) {
        const token = jwt.sign({ username: username }, "secretLOL", {
            // expiresIn: 86400, // expires in 24 hours
            expiresIn: 100, // expires in 100 seconds FOR TESTING
        });
        res.send({
            code: 3,
            message: {
                auth: true,
                token: token,
            },
        });

        // res.send({
        //     code: 3,
        //     message: "Successful login!",
        // });
    } else {
        res.send({
            code: 4,
            message: "Incorrect details!",
        });
    }
};

const verifyLogin = (req, res) => {
    let token = req.params.token;

    jwt.verify(token, "secretLOL", function (err, decoded) {
        if (!err) {
            res.send({
                auth: true,
                decoded: decoded.username,
            });
        } else {
            res.send({
                auth: false,
                decoded: "",
            });
        }
    });
};

// add a standardised questionnaires
const addStandardisedQuestionnaire = function (req, res) {
    const uuid = uuidv1();

    let newQuestionnaire = new Questionnaire({
        questionnaireId: uuid,
        title: "SSQ-CH",
        description: "SSQ-CH",
        sections: [
            {
                title: "Speech",
                scenarios: [
                    {
                        description: "You are at Melbourne Uni...",
                        questions: [
                            {
                                isMCQ: false,
                                rangeOptions: ["Zero", "Ten"],
                            },
                            {
                                description:
                                    "If only one option can be true, which of the following is correct?",
                                isMCQ: true,
                                MCQOptions: [
                                    "All of the above is true",
                                    " Those below the below is true",
                                    "None of the above is true",
                                    "Those above the above is true",
                                ],
                            },
                        ],
                    },
                ],
            },
            { title: "Spatial", scenarios: [] },
            { title: "Quality", scenarios: [] },
        ],
        isStandard: true,
    });

    newQuestionnaire.save(function (err, createdQuestionnaire) {
        console.log("added standardised questionnaire:", uuid);
    });
};

//add an instruction
const addInstruction = function (req, res) {
    let newInstruction = new Instruction({
        title: "Hello world",
        content: "How are you?",
        type: "RP",
    });

    newInstruction.save(function (err, createdQuestionnaire) {
        console.log("added instruction!");
    });
};

// Get all standardised questionnaires for admin
const getStandardisedQuestionnaire = function (req, res) {
    Questionnaire.find({ isStandard: true }, function (err, questionnaire) {
        if (!err && questionnaire != null) {
            console.log("successful");
            res.send(questionnaire);
        } else {
            res.send(err);
        }
    });
};

//Get the title and content of the Instruction
const getInstruction = function (req, res) {
    Instruction.findOne({}, function (err, Instruction) {
        if (!err && Instruction != null) {
            res.send(Instruction);
        } else {
            res.send(err);
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
            res.send(JSON.stringify(instruction));
        } else {
            res.send(JSON.stringify(err));
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
            res.send(JSON.stringify(summary));
        } else {
            res.send(JSON.stringify(err));
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

                res.send("successfully edit");
                
              
            } else {
                res.send(err);
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
            res.send(JSON.stringify(summary));
        } else {
            res.send(JSON.stringify(err));
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
            res.send(JSON.stringify(summary));
        } else {
            res.send(JSON.stringify(err));
        }
    });
};



module.exports.loginAdmin = loginAdmin;
module.exports.verifyLogin = verifyLogin;
module.exports.addStandardisedQuestionnaire = addStandardisedQuestionnaire;
module.exports.getStandardisedQuestionnaire = getStandardisedQuestionnaire;
module.exports.getInstruction = getInstruction;
module.exports.getSpecificInstruction = getSpecificInstruction;
module.exports.getInstructionsSummary = getInstructionsSummary;
module.exports.updateInstructionByType = updateInstructionByType;
module.exports.addInstruction = addInstruction;
module.exports.getOrganisations = getOrganisations;
module.exports.getOrganisationClinicians = getOrganisationClinicians;