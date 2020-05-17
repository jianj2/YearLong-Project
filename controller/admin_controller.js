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

var Admin = mongoose.model('admin');

// Get all admin details.
var getAllAdmin = function (req, res) {
    Admin.find(function(err, allAdmin){
        if(!err){
            res.send(allAdmin);
        } else {
            res.send(err);
        }
    });
};

// Create a new admin.
var createAdmin = function (req,res) {
    var newAdmin = new Admin({
        adminId: 'admin',
        name: "Victor",
        username: "AdminExample",
        email: "testadmin@example.com",
        password: "adminpassword",
        questionnaires: ['questionnaireId1', 'questionnaireId2'],
    });

    newAdmin.save(function(err, createdAdmin) {
        if (!err){
            res.send(createdAdmin);
        } else {
            res.send(err);
        }
    })
};


module.exports.getAllAdmin = getAllAdmin;
module.exports.createAdmin = createAdmin;