var m = require('mithril');
var Relocalc = require('../index');

exports.controller = function (options) {
  ctrl = this;
  /*
   * this function calls a POST request to sign in
   */
  ctrl.signIn = function() {
  };
};

exports.view = function (ctrl, options) {
  return  m('.row', 
  [m('div',
    [m('h1',  "Sign In"),
        [m('form[role="form"]',
            [m('input.addressInput.address[type="text"][placeholder="Email"]'//,
              // {value: options.location.address(),
              // onchange: function(e){ options.location.address(e.currentTarget.value); }}
            )], //input form - email field
            [m('input.addressInput.address[type="text"][placeholder="Password"]'//,
              // {value: options.location.address(),
              // onchange: function(e){ options.location.address(e.currentTarget.value); }}
            )] //input form - password field
        ),  //form-group
        m('input.addressInput.addressInput-submit[type="submit"][value="Sign In"]')//,
        // {onclick: ctrl.fetchGeoCode})
        ] //form
      ]) //h1
    //searchBox
  ])//row
};

