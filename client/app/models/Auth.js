var m = require('mithril');
var host = "localhost:4000";
var fb = 'https://craply.firebaseio.com/';
var ref = new Firebase(fb);
/**
 * returns session token
 */

var Auth = module.exports = {

  token: null,

  signUp: function(email, password, cb){
    var email = email;
    var password = password;
    var success = null;
    return ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        toastr["error"](error);
      } else {
        ref.authWithPassword({
          email    : email,
          password : password
        }, function(error, authData) {
          if (error) {
            cb(null, error)
          } else {
            success = true;
            cb(success, null);
          }
        });
      }
    })
  },

  authorizeUser: function(authToken, cb){
    return ref.authWithCustomToken(authToken, function(error, authData) {
        if (error) {
          console.log("Authentication Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
  },


  signIn: function(email, password, cb){
    return m.request({
      method: 'POST',
      url: host + '/signin',
      data: { email: email, password: password }
  })
      .then(function(response) {
        Auth.token = response.apiToken;
      })
  }

};
