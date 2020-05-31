/**
 * ===============================================
 * ROUTES OF SHARE (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 31 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/share.js is used for defining the routes of each API call in share_controller.
 */


var express = require('express');
var router = express.Router();
var share_controller = require('../controller/share_controller.js');

// CRUD Routes for Shares
router.get('/', share_controller.getQuestionnaireId);
// router.get('/', share_controller.getQuestionnaireId());

module.exports = router;
