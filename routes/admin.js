/**
 * =========================================
 * ROUTES OF ADMIN (USING EXPRESS.ROUTER)
 * =========================================
 * @date created: 17 May 2020
 * @authors: Victor
 *
 * The routes/admin.js is used for defining the routes of each API call in admin_controller made from the frontend
 */

const express = require('express');
const router = express.Router();
const admin_controller = require('../controller/admin_controller.js');


// CRUD Routes for Posts
//admin_controller.addStandardisedQuestionnaire()

router.post('/login', admin_controller.loginAdmin);
router.get("/verifylogin/:token", admin_controller.verifyLogin);
router.get('/getStandardisedQuestionnaire', admin_controller.getStandardisedQuestionnaire);


module.exports = router;
