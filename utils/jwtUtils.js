/**
 * ========================================
 * JWT Utility Functions
 * ========================================
 * @date created: 9 October 2020
 * @authors: Cary
 *
 * Utility functions used for handling JWT.
 */

const jwt = require("jsonwebtoken");


// extracts clinician email address from HTTP requests with an Authorization Header
const extractUserEmail = (req)=> {
    const  authHeader = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userEmail = authHeader['http://pediatric-scale.com/email'];
    return userEmail;
 } 

 module.exports.extractUserEmail = extractUserEmail;