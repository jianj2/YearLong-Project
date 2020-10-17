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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const Instruction = mongoose.model("instruction");
const Clinician = mongoose.model("clinician");
const Admin = mongoose.model("admin");

const compareAsync = (param1, param2) => {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(param1, param2, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const authenticateAdmin = async (username, password) => {
    try {
        // find admin with that username.
        const admin = await Admin.findOne({
            username: username,
        });

        if (!admin) {
            throw Error("Incorrect details!");
        }

        const isMatch = await compareAsync(password, admin.password);

        if (isMatch) {
            const token = jwt.sign({ username: username }, "secretLOL", {
                expiresIn: 86400, // expires in 24 hours
                //expiresIn: 100, // expires in 100 seconds FOR TESTING
            });
            return Promise.resolve([
                undefined,
                {
                    auth: true,
                    token: token,
                },
            ]);
        } else {
            throw Error("Incorrect details!");
        }
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, function (err, decoded) {
            if (!err) {
                resolve({
                    auth: true,
                    decoded: decoded.username,
                });
            } else {
                resolve({
                    auth: false,
                    decoded: "",
                });
            }
        });
    });
};

const getCountryListFromDatabase = async () => {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country != null && clinician.country.trim() != ""
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                country: clinician.country.toUpperCase(),
                clinicianId: clinician.clinicianId,
            };
        });
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const getOrganisationListFromDatabase = async (req) => {
    try {
        const clinicians = await Clinician.find({});
        const filteredClinicians = clinicians.filter(
            (clinician) =>
                clinician.country != null &&
                clinician.country.toUpperCase() == req.params.countryName
        );
        const summary = filteredClinicians.map((clinician) => {
            return {
                organisation: clinician.organisation.toLowerCase(),
                clinicianId: clinician.clinicianId,
            };
        });
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const getOrganisationCliniciansFromDatabase = async (req) => {
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
        return Promise.resolve([undefined, summary]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

const createAdminInDatabase = async () => {
    var newAdmin = new Admin({
        username: "",
        email: "",
        password: "",
    });
    //hashing the password and then saving the user.
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err){
                 console.error(err);
            };
            newAdmin.password = hash;
            newAdmin.save(function (err, createdUser) {
                if (!err) {
                    console.log(createdUser);
                } else {
                    console.error(err);
                }
            });
        });
    });
};

// Instructions

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
        console.log(instruction);
        await Instruction.replaceOne({ type: instruction.type }, instruction);
        return Promise.resolve([undefined, "Successfully updated instruction"]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

module.exports.authenticateAdmin = authenticateAdmin;
module.exports.findInstructionByType = findInstructionByType;
module.exports.findAllInstructions = findAllInstructions;
module.exports.updateInstructionInDatabase = updateInstructionInDatabase;
module.exports.verifyToken = verifyToken;
module.exports.getCountryListFromDatabase = getCountryListFromDatabase;
module.exports.getOrganisationListFromDatabase = getOrganisationListFromDatabase;
module.exports.getOrganisationCliniciansFromDatabase = getOrganisationCliniciansFromDatabase;
module.exports.createAdminInDatabase = createAdminInDatabase;
