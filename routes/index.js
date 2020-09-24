const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    //res.send('Pediatric SSQ Server');
    res.send(JSON.stringify({ client: process.env.CLIENT, all: process.env}))
});

module.exports = router;