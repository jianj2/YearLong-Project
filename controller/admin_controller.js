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

const { sendJSONResponse } = require("../utils/apiUtils");
const {
    findInstructionByType,
    findAllInstructions,
    updateInstructionInDatabase,
    verifyToken,
    getCountryListFromDatabase,
    getOrganisationListFromDatabase,
    getOrganisationCliniciansFromDatabase,
    authenticateAdmin,
    createAdminInDatabase,
} = require("../service/adminService");
const serverSecret =  "secretLOL";

// Login check.
const loginAdmin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const [err, message] = await authenticateAdmin(username, password);
    sendJSONResponse(res, {message: message}, err, 401);
};

const verifyLogin = async (req, res) => {
    const token = req.params.token;
    const result = await verifyToken(token,serverSecret);
    if (result.auth === true) {
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
};

async function authorize(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        try {
            const result = await verifyToken(bearerToken, serverSecret);
            if (result.auth === false) {
                res.status(403).json(result);
            } else {
                // Next middleware
                next();
            }
        } catch (e) {
            res.sendStatus(403);
        }
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
    sendJSONResponse(res, message, error, 400);
};

// Get all country list
const getCountryList = async function (req, res) {
    const [err, countryList] = await getCountryListFromDatabase();
    sendJSONResponse(res, countryList, err, 400);
};

// Get organization list under the country
const getOrganisations = async function (req, res) {
    const [err, organisationList] = await getOrganisationListFromDatabase(req);
    sendJSONResponse(res, organisationList, err, 400);
};

// Get clinician list under the organisation
const getOrganisationClinicians = async function (req, res) {
    const [err, clinicianList] = await getOrganisationCliniciansFromDatabase(
        req
    );
    sendJSONResponse(res, clinicianList, err, 400);
};

// DO NOT DELETE - Backup function used to create new admins
// const createAdmin = function (req, res){
//    createAdminInDatabase();
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
