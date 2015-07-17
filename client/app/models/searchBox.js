var m = require('mithril');
var fbUrl = 'https://craply.firebaseio.com/'
var maps = 'https://maps.googleapis.com/maps/api/geocode/'

var addressFormatter = function(address) {
  var newAddress = "";
  for (var i = 0; i < address.length; i++){
    if (address[i] === " "){
      newAddress += "+";
    } else{
      newAddress += address[i];
    }
  }
  return newAddress;
}


var Locations = module.exports = {

  post: function(data){
    console.log("post function called with" + data);
    return m.request({method: "POST", url: fbUrl +".json", data: {address: data}})
        .then(function(res){ console.log("response: " + res);});
  },

  geoCode: function(address){
    return m.request({method: "POST", url: maps + 'json?address=' + addressFormatter(address)})
        .then(function(res){ console.log("response: " + res)});
  },

  vm: function(){
    return {
      address: m.prop(''),
      location: m.prop(''),
      longitude: m.prop(''),
      post: Location.post,
      geoCode: Location.geoCode
    }
  }

};




