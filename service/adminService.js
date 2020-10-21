////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Instruction = mongoose.model("instruction");
const Clinician = mongoose.model("clinician");
const Admin = mongoose.model("admin");

/**
 * =============================================================================
 * DEFINING ADMIN SERVICE
 * =============================================================================
 * @date created: 5 Oct 2020
 * @authors: Cary
 *
 * The admin service handles the domain and data
 * source logic related to standard instructions,
 * clinician information and any other data that
 * can be viewed or managed by admins.
 */


const compareAsync = (param1, param2) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(param1, param2, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Authenticate Admin
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const authenticateAdmin = async (username, password) => {
    try {
        // find admin with that username.
        const admin = await Admin.findOne({
            username: username
        });

        if (!admin) {
            throw Error("Incorrect details!");
        }

        const isMatch = await compareAsync(password, admin.password);

        if (isMatch) {
            const token = jwt.sign({ username: username }, "secretLOL", {
                expiresIn: 86400 // expires in 24 hours
                //expiresIn: 100, // expires in 100 seconds FOR TESTING
            });
            return Promise.resolve([
                undefined,
                {
                    auth: true,
                    token: token
                }
            ]);
        } else {
            throw Error("Incorrect details!");
        }
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Verify Token
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (!err) {
                resolve({
                    auth: true,
                    decoded: decoded.username
                });
            } else {
                resolve({
                    auth: false,
                    decoded: ""
                });
            }
        });
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Get Country list from database
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getCountryListFromDatabase = async () => {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country !== null && clinician.country.trim() !== ""
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                country: clinician.country.toUpperCase(),
                clinicianId: clinician.clinicianId
            };
        });
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Get Country list from database
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getOrganisationListFromDatabase = async (req) => {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country !== null &&
                clinician.country.toUpperCase() === req.params.countryName
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                organisation: clinician.organisation.toLowerCase(),
                clinicianId: clinician.clinicianId
            };
        });
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Get Country list from database
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const getOrganisationCliniciansFromDatabase = async (req) => {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.organisation !== null &&
                clinician.organisation.toLowerCase() ===
                req.params.organisationName
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                organisation: clinician.organisation,
                clinicianId: clinician.clinicianId
            };
        });
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Create Admin in Database
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const createAdminInDatabase = async () => {
    var newAdmin = new Admin({
        username: "",
        email: "",
        password: ""
    });
    //hashing the password and then saving the user.
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) {
                console.error(err);
            }
            newAdmin.password = hash;
            newAdmin.save((err, createdUser) => {
                if (!err) {
                    console.log(createdUser);
                } else {
                    console.error(err);
                }
            });
        });
    });
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Instructions functions
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
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
};
const updateInstructionInDatabase = async (instruction) => {
    try {
        await Instruction.replaceOne({ type: instruction.type }, instruction);
        return Promise.resolve([undefined, "Successfully updated instruction"]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = {
    authenticateAdmin,
    findInstructionByType,
    findAllInstructions,
    updateInstructionInDatabase,
    verifyToken,
    getCountryListFromDatabase,
    getOrganisationListFromDatabase,
    getOrganisationCliniciansFromDatabase,
    createAdminInDatabase
};