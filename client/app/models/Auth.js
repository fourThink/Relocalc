var m = require('mithril');
var host = "localhost:4000";
var fb = 'https://craply.firebaseio.com/';
var ref = new Firebase(fb);

/**
 * Global getter (checkUser) to access a local object with the current authenticated userID
 */

var LoggedIn = {};
LoggedIn.userID = null;

window.checkUser = function() {
  return LoggedIn.userID;
};

// onAuth is a Firebase method that triggers if there is a change in the status of the authentication status

ref.onAuth(function(authData) {
  if(authData) {
    console.log("Authentication state update (+)" + authData);
    return LoggedIn.userID = authData.uid;
  }
  console.log("Authentication state update (-)" + authData);
  return LoggedIn.userID = null;
});

/**
 * AUTH MODEL
 * @type {{createUserAndLogin: Function, signIn: Function, logout: Function, isAuthenticated: Function}}
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
        Auth.signIn(email, password, cb);
        var users = ref.child("users").child(userData.uid);
        var userProfile = {
          email: email,
          searches: []
        };
        users.set(userProfile)
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

  logout: function() {
    LoggedIn.userID = null;
    return ref.unauth();
  },

  /**
   * probably a better way to check if a user is logged in anywhere than the getUser method above
   * @returns {uid}
   */

  isAuthenticated: function() {
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
