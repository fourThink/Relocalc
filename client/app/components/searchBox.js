var m = require('mithril');
var Location = require('../models/Location');
var Relocalc = require('../index');

exports.controller = function (options) {
  ctrl = this;
  /**
   * this function calls a POST request to the google API to get Lat and Lng values
   */

  ctrl.fetchGeoCode = function() {
    var address = options.location.address();
    return Location.postToFetchGeoCode(address, function(res) {
      options.location.lng(res.results[0].geometry.location.lng);
      options.location.lat(res.results[0].geometry.location.lat);
      console.log('lat: ' + options.location.lat());
      console.log('lng: ' + options.location.lng());
    });
  };
};

exports.view = function (ctrl, options) {
  return m('.searchBox',
      [m('label', 'Enter an Address:'),
        m('input[type=text]', {value: options.location.address(),
          onchange: function(e){ options.location.address(e.currentTarget.value); }}),
            m('input[type=submit]',
              {onclick: ctrl.fetchGeoCode})
      ]);
};

