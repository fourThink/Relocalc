var m = require('mithril');
var url = "";

/**
 *
 */

var Users = module.exports = {

  postNewUser: function(user, cb){
    return m.request({method: "POST", url: url, data: user})
        .then(function(res){
          cb(res);
        });
  },

  vm: function(){
    return {
      email: m.prop(''),
      password: m.prop('')
    }
  }

};
