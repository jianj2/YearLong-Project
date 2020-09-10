const jwt = require("jsonwebtoken");

const extractUserEmail = (req)=> {
    const  authHeader = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userEmail = authHeader['http://pediatric-scale.com/email'];
    return userEmail;
 } 

 module.exports.extractUserEmail = extractUserEmail;