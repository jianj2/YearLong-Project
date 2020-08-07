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
            }
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
        if (!err){
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
}

// Create a new admin.
// var createAdmin = function (req,res) {
//     var newAdmin = new Admin({
//         adminId: 'admin',
//         name: "Victor",
//         username: "AdminExample",
//         email: "testadmin@example.com",
//         password: "adminpassword",
//         questionnaires: ['questionnaireId1', 'questionnaireId2'],
//     });
//
//     newAdmin.save(function(err, createdAdmin) {
//         if (!err){
//             res.send(createdAdmin);
//         } else {
//             res.send(err);
//         }
//     })
// };

module.exports.loginAdmin = loginAdmin;
module.exports.verifyLogin = verifyLogin;
//module.exports.createAdmin = createAdmin;
