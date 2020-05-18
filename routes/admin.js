/**
 * =========================================
 * ROUTES OF ADMIN (USING EXPRESS.ROUTER)
 * =========================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The routes/admin.js is used for defining the routes of each API call in admin_controller made from the frontend
 */

var express = require('express');
var router = express.Router();
var admin_controller = require('../controller/admin_controller.js');


// CRUD Routes for Posts
router.get('/', admin_controller.loginAdmin);
//router.get('/123', admin_controller.createAdmin);


module.exports = router;
