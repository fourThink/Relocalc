var m = require('mithril');
var Location = require('../models/location');
//var loaderView = require('./loader').loader;

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {

   var adjustZoom = function(){
     if(options.location.address()){
       return 16;
     }
     else {
       return 8;
     }
   };


    context.timer = setTimeout(function () {
      var lat = options.location.lat() || 30.25;
      var lng = options.location.lng() || -97.75;
      var mapCenter = new google.maps.LatLng(lat, lng);
      var mapOptions = {
        center: mapCenter,
        zoom: adjustZoom()
      };

      var map = new google.maps.Map(document.querySelector('.mapContainer'), mapOptions);

      // //Trying out adding multiple markers for dangerous dogs
      // var addresses = ['2105 Horse Wagon Dr', '3904 Caney Creek', '4809 Clear View Dr'];
      // for (var x = 0; x < addresses.length; x++) {
      //   $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function(data){
      //     var p = data.results[x].geometry.location;
      //     var latlng = new google.maps.LatLng(p.lat, p.lng);
      //     new google.maps.Marker({
      //       position: latlng,
      //       map: map
      //     });
      //   });
      // }
      // // END Trying out adding multiple markers for dangerous dogs

      //First version of marker
      var iconImg = '../img/icon.png';

      var marker = new google.maps.Marker({
        position: mapCenter,
        map: map,
        // icon: iconImg,
        title: options.location.address() || ''
      });

      marker.setMap(map);
      //End first version of marker
    }, 0);



  };

};

exports.view = function(ctrl, options) {
   return m('.col-sm-6 .mapContainer', {config: ctrl.initialize});
};

function drawMap() {
  ctrl.initialize();
  console.log("map is drawn");
};

function unloadable(element, isInit, context) {
   context.timer = setTimeout(function() {
       ctrl.initialize();
   }, 0);
}

//was testing out using a loader below instead of/with setTimeout
/*
function requestWithFeedback(args) {
  //query the DOM for loaders
  var loaders = document.querySelectorAll(".loader");

  for (var i = 0, loader; loader = loaders[i]; i++) {
    loader.style.display = "block";
  }

  return m.request(args).then(function(value){
    for (var i = 0, loader; loader = loaders[i]; i++) {
      loader.style.display = "none";
    }
    return value;
  })
}
*/

// results[0].geometry.location.lat and results[0].geometry.location.lng
