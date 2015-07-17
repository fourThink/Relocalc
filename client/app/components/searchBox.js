var m = require('mithril');
var Location = require('../models/searchBox');

exports.controller = function (options) {
  ctrl = this;
  ctrl.location  = Location.vm();
  /**
   * this function calls a POST request to the google API to get Lat and Lng values
   */
  ctrl.fetchGeoCode = function() {
    var address = ctrl.location.address();
    return Location.postToFetchGeoCode(address, function(res) {
      console.log(res);
    });
  };
};

exports.view = function (ctrl, options) {
  return m('.searchBox',
      [m('label', 'Enter an Address:'),
        m('input[type=text]', {value: ctrl.location.address(),
          onchange: function(e){ ctrl.location.address(e.currentTarget.value); }}),
            m('input[type=submit]',
              {onclick: ctrl.fetchGeoCode})
      ]);
};