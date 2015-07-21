var m = require('mithril');
var User = require('../models/User');

var signup = module.exports = {};

signup.controller = function (options) {
  ctrl = this;
  ctrl.user = User.vm();
  ctrl.signup = function(e) {
    e.preventDefault();
    ctrl.user.email();
    ctrl.user.password();
    console.log("here with " + ctrl.user.email() + " " +  ctrl.user.email())
  };
};

signup.view = function (ctrl, options) {
  return m('.container',
      [m('.row.signup-container',
          [m('.col-sm-6.col-sm-offset-3',
            [m('.panel.panel-default',
                [m('.panel-heading.text-center',
                    [m('h3', "Signup")]),
                 m('.panel-body',
                    [m('form', signUpForm())])
                ])
            ])
          ])
      ])
};

function signUpForm(){
  return [
      m('.form-group', [
          m('input.form-control.input-lg[placeholder="email"]', { value: ctrl.user.email() })]),
      m('.form-group', [
          m('input.form-control.input-lg[placeholder="password"]', { value: ctrl.user.password() })]),
      m('input.btn.btn-default.btn-lg.pull-right[type="submit"][value="Signup"]', { onclick: ctrl.signup })
      ]
}
