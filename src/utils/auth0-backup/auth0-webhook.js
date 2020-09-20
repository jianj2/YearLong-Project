/**
 * Copy the following code into an Auth0 webhook for post registration.
 */

/**
@param {object} user - The user being created
@param {string} user.id - user id
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} user.user_metadata - user metadata
@param {object} user.app_metadata - application metadata
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/

WEBHOOK_URL = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/pediatricssq-ziywj/service/Trial/incoming_webhook/registerClinician'

// sends registration information to our MongoDB database
sendRegistrationInformation  =  (user, context) => {
  console.log("calling");
  const axios = require('axios');

  let dataToPost = {
    user: user.username,
    email: user.email,
    // The user_metadata has the following things:
    firstName: user.user_metadata.firstName,
    lastName: user.user_metadata.lastName,
    organisation: user.user_metadata.organisation,

  
    

  };

  let axiosConfiguration = {
    headers: {
        'Content-Type': 'application/json',
    }
  };

  axios.post(WEBHOOK_URL, dataToPost, axiosConfiguration)
  .then((res) => {
    console.log("Response: ", res);
  })
  .catch((err) => {
    console.log("error: ", err);
  })
}
module.exports = function (user, context, cb) {
  // Perform any asynchronous actions, e.g. send notification to Slack.
  sendRegistrationInformation(user, context);
};
