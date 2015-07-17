var m = require('mithril');
var fbUrl = 'https://craply.firebaseio.com/'
var maps = 'https://maps.googleapis.com/maps/api/geocode/'

/**
 * replaces blank spaces in submitted address with "+" per the Google API reqs
 * @param address
 * @returns {string}
 */

var addressFormatter = function(address) {
  var newAddress = "";
  for (var i = 0; i < address.length; i++){
    if (address[i] === " "){
      newAddress += "+";
    } else{ newAddress += address[i];}
  }
  return newAddress;
};

/**
 * model for serves Relocalc, which passes the data down to its children in searchBox & map
 */

var Locations = module.exports = {

  postToFetchGeoCode: function(address, cb){
    return m.request({method: "POST", url: maps + 'json?address=' + addressFormatter(address)})
        .then(function(res){
          cb(res);
        });
  },

  vm: function(){
    return {
      address: m.prop(''),
      lat: m.prop(''),
      lng: m.prop('')
    }
  }

};




