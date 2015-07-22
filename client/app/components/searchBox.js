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
  return m('.row', [
    m('.card-holder',[
  m('.addressInput-card',
      [m('h1',  "Relocalc"),
        [m('form[role="form"]',
            [m('input.addressInput.address[type="text"][placeholder="700 San Jacinto, Austin, TX 78701"]',
              {value: options.location.address(),
              onchange: function(e){ options.location.address(e.currentTarget.value); }}
            )] //input form
        ),  //form-group
        m('input.addressInput.addressInput-submit[type="submit"][value="Try your luck"]',
        {onclick: ctrl.fetchGeoCode})]
      ] //form
    )//searchBox
  ])
])
};
