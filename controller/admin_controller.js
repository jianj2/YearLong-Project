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


const mongoose = require('mongoose');
const adminFile = require('../file/admin')

var Admin = adminFile
var Admin1 = mongoose.model('admin');

// Define a message object returned to the front-end
let responseData;
responseData = {
    // status
    code: 0,
    // message
    message: ""
};


// Login check.
var loginAdmin = function (req, res) {
    let _username = "AdminExample"
    let _password = "adminpassword"
    let username = Admin.username
    let password = Admin.password
    // Username can not be empty
    if (_username === "" ){
        responseData.code = 1;
        responseData.message = "Username can not be empty!";
        res.json(responseData);
        return;
    }
    if (_password === "" ) {
        responseData.code = 2;
        responseData.message = "Password can not be empty!";
        res.json(responseData);
        return;
    }
    if (_username === username) {
        // check out password
        if (_password === password) {
            responseData.code = 3
            responseData.message = "Successfully login!";
            res.json(responseData);
            return;
        } else {
            responseData.code = 4;
            responseData.message = "Password is incorrect!";
            res.json(responseData);
            return;
        }
    }else {
        responseData.code = 5;
        responseData.message = "Username does not exist!";
        res.json(responseData);
        return;
    }

};

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
//module.exports.createAdmin = createAdmin;