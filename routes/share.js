/**
 * ===============================================
 * ROUTES OF SHARE (USING EXPRESS.ROUTER)
 * ===============================================
 * @date created: 31 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/share.js is used for defining the routes of each API call in share_controller.
 */


const express = require('express');
const router = express.Router();
const share_controller = require('../controller/share_controller.js');

// CRUD Routes for Shares
router.get('/:shareId', share_controller.getShareDetails);

router.post("/submit/:shareId", share_controller.completeShare);

module.exports = router;
