var m = require('mithril');
var host = "localhost:4000";
var fb = 'https://craply.firebaseio.com/';
var ref = new Firebase(fb);

/**
 * Below is a global method to access a local object with the current authenticated userID
 */

var LoggedIn = {};
LoggedIn.userID = null;

window.checkUser = function() {
  return LoggedIn.userID;
};

ref.onAuth(function(authData) {
  if(authData) {
    console.log("logout state changed (+)" + authData);
    return LoggedIn.userID = authData.uid;
  }
  console.log("logout state changed (-)" + authData);
  return LoggedIn.userID = null;
});

/**
 * AUTH MDDEL
 * @type {{createUserAndLogin: Function, signIn: Function, logout: Function, isAuthenicated: Function}}
 */

var Auth = module.exports = {

  createUserAndLogin: function(email, password, cb){
    return ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        toastr["error"](error);
      } else {
        LoggedIn.userID = userData.uid;
        Auth.signIn(email, password, cb)
      }
    })
  },

  signIn: function(email, password, cb){
    var loggedIn = null;
    return ref.authWithPassword({
      'email'    : email,
      'password' : password
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        cb(null, error, null);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        LoggedIn.userID = authData.uid;
        cb(LoggedIn.userID, error, authData.uid);
      }
    });
  },

  logout : function() {
    LoggedIn.userID = null;
    return ref.unauth();
  },

  isAuthenicated: function() {
    var authData = ref.getAuth();
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      LoggedIn.userID = authData.uid;
      return authData.uid;
    } else {
      console.log("User is logged out");
      return false;
    }
  }
};
