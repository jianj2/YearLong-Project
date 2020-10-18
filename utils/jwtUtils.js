/**
 * ========================================
 * JWT Utility Functions
 * ========================================
 * @date created: 9 October 2020
 * @authors: Cary
 *
 * Utility functions used for handling JWT.
 */

const expressJWT = require('express-jwt');

const jwt = require("jsonwebtoken");
const jwksRsa = require('jwks-rsa');
const domain = process.env.SERVER || "http://localhost:3001";

const production = process.env.NODE_ENV;
// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = production == "production" ? expressJWT({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://ssq.au.auth0.com/.well-known/jwks.json` 
  }),

  // Validate the audience and the issuer.
  audience: `${domain}/clinician`,
  issuer: `https://ssq.au.auth0.com/`,
  algorithms: ['RS256']
}):
expressJWT({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://pediatric-scale.au.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: `http://localhost:3001/clinician`, // for localhost development, hardcoded in Auth0
    issuer: `https://pediatric-scale.au.auth0.com/`,
    algorithms: ['RS256']
  });


// extracts clinician email address from HTTP requests with an Authorization Header
const extractUserEmail = (req)=> {
    const  authHeader = jwt.decode(req.headers.authorization.split(' ')[1]);
    const userEmail = authHeader['http://pediatric-scale.com/email'];
    return userEmail;
 } 

 module.exports.extractUserEmail = extractUserEmail;
 module.exports.checkJwt = checkJwt;