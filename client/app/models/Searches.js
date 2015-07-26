var m = require('mithril');
var Auth = require('./Auth');
var _ = require('underscore');
var fbUrl = 'https://craply.firebaseio.com/';
var user = Auth.isAuthenticated() || "undefined";

var ref = new Firebase(fbUrl + "users/").child(user).child("searches");

ref.on("value", function (snapshot) {
  Searches.userSearches(_.toArray(snapshot.val()));
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var Searches = module.exports = {

  userSearches: m.prop([]),

  fetchAllSearchesOfOneUser: function(cb){
    return ref.once("value", function(snapshot){
      cb(_.toArray(snapshot.val()));
    })
  }
};