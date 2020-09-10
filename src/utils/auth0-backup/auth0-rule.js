// Copy the following function (remove "let backup =") to Auth 0 as a rule in order to
// add the authenticated user's email address to the access token .

let backup = function (user, context, callback) {

    var namespace = 'http://pediatric-scale.com/';
  
    context.accessToken[namespace + 'email'] = user.email;
    return callback(null, user, context);
  
}