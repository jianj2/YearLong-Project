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

// Login check.
var loginAdmin = function (req, res) {
    var _username = "AdminExample"
    var _password = "adminpassword"
    Admin.findOne({username:_username}, function(err, user){
        if(err){
            console.log(err)
        }
        if(!user){
            console.log('wrong username')
        }
        else {
            Admin.findOne({password:_password}, function (err,isMatch) {
                if(err){
                    console.log(err)
                }
                if(isMatch){
                    console.log('successfully login')
                } else{
                    console.log('wrong password')
                }
            })
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


module.exports.loginAdmin = loginAdmin;
module.exports.createAdmin = createAdmin;