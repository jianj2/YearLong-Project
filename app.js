const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


const app = express();
const domain = "http://localhost:3001";

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
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
    audience: `${domain}/clinician`,
    issuer: `https://pediatric-scale.au.auth0.com/`,
    algorithms: ['RS256']
  });

  



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


require('./models/db.js');

// CORS
const cors = require('cors');

app.use(cors());

app.get('/admin/secret2', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
    });
  });
// defining routes
const indexRouter = require('./routes');
const clinicianRouter = require('./routes/clinician');
const questionnaireRouter = require('./routes/questionnaire');
const adminRouter = require('./routes/admin');
const shareRouter = require('./routes/share');



// using routes

app.use('/', indexRouter);
app.use('/clinician/', clinicianRouter);
app.use('/questionnaire/', questionnaireRouter);
app.use('/admin/', adminRouter);
app.use('/share/', shareRouter);







const port = process.env.PORT || 3001;
app.listen(port, function (req,res) {
    console.log("server is running on port " + port + "!");
});
