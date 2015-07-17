var m = require('mithril');
var Location = require('../models/searchBox');

exports.controller = function (options) {
  ctrl = this;
  ctrl.location  = Location.vm();
  ctrl.post = function(){
    var data = ctrl.location.address();
    return Location.post(data);
  };
  ctrl.geoCode = function() {
    var address = ctrl.location.address();
    Location.geoCode(address);
  };
};

exports.view = function (ctrl, options) {
  return m('.searchBox',
      [m('label', 'Enter an Address:'), m('input[type=text]', {value: ctrl.location.address(),
      onchange: function(e){ ctrl.location.address(e.currentTarget.value);
      console.log("in view" + ctrl.location.address())}}), m('input[type=submit]',
          {onclick: ctrl.geoCode})
      ]);
};