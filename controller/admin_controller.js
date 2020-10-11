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
const bcrypt = require('bcryptjs');


const { sendJSONResponse } = require("../utils/apiUtils");
const {
    findInstructionByType,
    findAllInstructions,
    updateInstructionInDatabase,
} = require("../service/adminService");

const Clinician = mongoose.model("clinician");
const Admin = mongoose.model("admin");


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
        res.status(400).json({ message: "Username can not be empty!" });
        return;
    }
    if (password === "") {
        res.status(400).json({ message: "Password can not be empty!" });
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
            },
        });
    } else {
        res.status(400).json({
            message: "Incorrect details!",
        });
    }
};

const verifyToken = (token, secret) =>{
    console.log("verifying");
    return new Promise((resolve,reject)=>{
        jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
               resolve({
                    auth: true,
                    decoded: decoded.username,
                });
            } else {
                 reject({
                    auth: false,
                    decoded: "",
                });
            }
        });
    });
}
const verifyLogin = async (req, res) => {
    const token = req.params.token;
    const result = await verifyToken(token, "secretLOL");
    if(result.auth === true){
        res.status(200).json(result);
    }else{
        res.status(401).json(result);
    }


};

async function authorize(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        try {
            const result = await verifyToken(bearerToken, "secretLOL");
            if(result.auth === false){
                res.status(403).json(result);
            }else{
                // Next middleware
                next();
            }
        }catch(e){ res.sendStatus(403); }

    } else {
        // Forbidden
        res.sendStatus(403);

    }

}

//Get all instructions
const getSpecificInstruction = async function (req, res) {
    const [error, instruction] = await findInstructionByType(
        req.params.instructionType
    );
    sendJSONResponse(res, instruction, error, 404);
};

//get summary for all instructions including type and title
const getInstructionsSummary = async function (req, res) {
    const [error, instructions] = await findAllInstructions();
    if (error) {
        res.status(400).json(error);
    } else {
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
    }
};

//Update the instruction based on type
const updateInstructionByType = async function (req, res) {
    const instruction = req.body.instruction;
    const [error, message] = await updateInstructionInDatabase(instruction);
    sendJSONResponse(res, message, error, 404);
};

// Get all country list
const getCountryList = async function (req, res) {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country != null &&
                clinician.country.trim() != ""
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                country: clinician.country.toUpperCase(),
                clinicianId: clinician.clinicianId,
            };
        });
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Get organization list under the country
const getOrganisations = async function (req, res) {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country != null &&
                clinician.country.toUpperCase() ==
                    req.params.countryName
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                organisation: clinician.organisation.toLowerCase(),
                clinicianId: clinician.clinicianId,
            };
        });
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Get clinician list under the organisation
const getOrganisationClinicians = async function (req, res) {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.organisation != null &&
                clinician.organisation.toLowerCase() ==
                    req.params.organisationName
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                organisation: clinician.organisation,
                clinicianId: clinician.clinicianId,
            };
        });
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).json(err);
    }
};

// function used to create new admins
// DO NOT DELETE - UVIN

// const createAdmin = function (req, res){
//     var newAdmin = new Admin({
//         username: "",
//         email: "",
//         password:""
//     });
//     //hashing the password and then saving the user.
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//             if (err) throw err;
//             newAdmin.password = hash;
//             newAdmin.save(function(err, createdUser){
//                 if (!err){
//                     res.send(createdUser);
//                 }
//                 else{
//                     console.log(err);
//                     res.send(err)
//                 }
//             });
//         })
//     });
// }


module.exports.loginAdmin = loginAdmin;
module.exports.verifyLogin = verifyLogin;
module.exports.getSpecificInstruction = getSpecificInstruction;
module.exports.getInstructionsSummary = getInstructionsSummary;
module.exports.updateInstructionByType = updateInstructionByType;
module.exports.getCountryList = getCountryList;
module.exports.getOrganisations = getOrganisations;
module.exports.getOrganisationClinicians = getOrganisationClinicians;
module.exports.authorize = authorize;


