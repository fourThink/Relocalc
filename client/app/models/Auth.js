var m = require('mithril');
var host = "localhost:4000";

/**
 * returns session token
 */

var Auth = module.exports = {

  token: null,

  signUp: function(email, password, cb){
    return m.request({
      method: 'POST',
      url: host + '/user',
      data: { email: email, password: password }
    })
      .then(function(response) {
        Auth.token = response.apiToken;
      })
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
