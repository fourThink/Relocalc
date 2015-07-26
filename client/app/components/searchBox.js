var m = require('mithril');
var Location = require('../models/Location');
var Relocalc = require('../index');

exports.controller = function (options) {
  ctrl = this;

  /**
   * this function in Location.js model; makes a post request to GoogleAPI for coordinates for the address, which are
   * then used for a post request to our database for the data for radius around location
   */

  ctrl.fetchGeoCode = function() {
    var address = options.location.address();
    return Location.postToFetchRestaurantData(address, function cb(res) {
      //set values on vm
      options.location.lng(res.lng);
      options.location.lat(res.lat);
      //force a re-render so the graphs display with the new values
      if (res !== null) {
        m.redraw();
        toastr["success"]("Data successfully loaded for " + address);
      }
    })
  };
};

exports.view = function (ctrl, options) {
  return m('.row', [
    m('.card-holder',[
  m('.addressInput-card',
      [m('h1',  "Relocalc"),
        [m('form[role="form"]', {onsubmit: ctrl.fetchGeoCode},
            [m('input.addressInput.address[type="text"][placeholder="Enter an Austin address (Example: 700 San Jacinto, Austin, TX 78701)"]',
              {value: options.location.address(),
              onchange: function(e){ options.location.address(e.currentTarget.value); }}
            )] //input form
        ),  //form-group
        m('input.addressInput.addressInput-submit[type="submit"][value="Try your luck"]')]
      ] //form
    )//searchBox
  ])
])
};

