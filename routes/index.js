////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

/**
 * =============================================================================
 * ROUTES OF CLINICIAN (USING EXPRESS.ROUTER)
 * =============================================================================
 * @date created: 10 May 2020
 * @authors: Uvin Abeysinghe
 *
 * The routes/index.js is used for defining the routes of each API call in clinician_controller made from the frontend
 */

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// Root route
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
router.get("/", (req, res, next) => {
    res.send("Pediatric SSQ Server ");
});

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = router;
