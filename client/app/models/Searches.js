var m = require('mithril');

var Searches = module.exports = {

  vm: function(){
    return {
      searches: m.prop([])
    }
  }
};