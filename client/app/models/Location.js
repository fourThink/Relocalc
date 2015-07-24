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

  search: m.prop({}),

  postToFetchGeoCode: function(address, cb){
    return m.request({method: "POST", url: maps + 'json?address=' + addressFormatter(address)})
        .then(function(res){
          cb(res);
        });
  },

  postToFetchRestaurantData: function(address, cb) {
    console.log(address);
    return this.postToFetchGeoCode(address, function (res) {
      var locationData = {
        "address": address,
        "lat": res.results[0].geometry.location.lat,
        "lng": res.results[0].geometry.location.lng,
        "radius": 1
      };
      console.log(res);
      return m.request({method: "POST", url: "", 'Content-Type': 'application/json', data: locationData})
        .then(function(res) {
          var modelDataResponse = modelData(res);
          Locations.search(modelDataResponse);
          return cb(modelDataResponse);
        }.bind(this))
    });
  },

  vm: function(){
    return {
      address: m.prop(''),
      lat: m.prop(''),
      lng: m.prop(''),
    }
  }

};

var modelData = function(data) {
  //Separate data into variables
  var inspectCount = 0;   

  var sum = data.restaurants.reduce(function(tot, rest){
    if(rest.avg) {
      tot += rest.avg;
      inspectCount++;
    }
    return tot;
  }, 0);

  var avg = sum / inspectCount;

  var response = {
    crimes: data.crimes.length,
    restaurants: data.restaurants.length,
    restAvg: avg
  }

  return response;
};

Locations.postToFetchRestaurantData("300 Congress Ave Austin Tx", function(res) {
  console.log(res);
});
