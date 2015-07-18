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
  return m('.searchBox.col-md-10',
      [m('form.form-inline',
        [m('.form-group',
          [m('.input-group',
            [m('input.form-control[type="text"][placeholder="Enter an Austin Address"]',
              {value: options.location.address(),
              onchange: function(e){ options.location.address(e.currentTarget.value); }}
            )] //input form
          )] //input group
        ),  //form-group
        m('input.btn.btn-default[type="submit"]',
        {onclick: ctrl.fetchGeoCode})]
      )] //form
    )//searchBox
};

