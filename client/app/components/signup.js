var m = require('mithril');
var Auth = require('../models/Auth');

var signup = module.exports = {};

signup.controller = function (options) {
  ctrl = this;
  ctrl.email = m.prop('');
  ctrl.password = m.prop('');

  ctrl.error = m.prop(null);

  ctrl.signup = function(e) {
    e.preventDefault();
    if (validateInputs(ctrl.email(), ctrl.password())){
      console.log("failed");
      ctrl.warning = {};
      return ctrl.warning.error = "Please enter a valid email address and password";
    } else {
      Auth.signUp( ctrl.email(), ctrl.password() ).then(function(){
        clearInputs();
        console.log("successfully signed up");
      }, ctrl.error)
    }
  };

  function clearInputs () {
    ctrl.email('')
    ctrl.password('')
    ctrl.error(null)
    flash = null
  }

  function validateInputs (email, password) {
    var emailMatch = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var passMatch = /^[0-9a-zA-Z]{6,}$/;
    return !emailMatch.test(email) || !passMatch.test(password);
  }

  var flash = null
  ctrl.getFlash = function () {
    var temp = flash
    flash = null
    return temp
  }
};

signup.view = function (ctrl, options) {
  return m('.container',
      [m('.row.signup-container',
          [m('.col-sm-6.col-sm-offset-3',
            [m('.panel.panel-default',
                [m('.panel-heading.text-center',
                    [m('h3', "Signup")]),
                 m('.panel-body',
                    [m('form', errorView(ctrl), signUpForm())])
                ])
            ])
          ])
      ])
};

function signUpForm() {
  return [
    m('.form-group', [
      m('input.form-control.input-lg[placeholder="joe.montana@49ers.com"]', {
        value: ctrl.email(),
        onchange: m.withAttr('value', ctrl.email)
      })]),
    m('.form-group', [
      m('input.form-control.input-lg[placeholder="At least 6 letters and/or numbers"]', {
        value: ctrl.password(),
        onchange: m.withAttr('value', ctrl.password)
      })]),
    m('input.btn.btn-default.btn-lg.pull-right[type="submit"][value="Signup"]', {onclick: ctrl.signup}),
  ]
}

function errorView(ctrl) {
  var errorObj = ctrl.error() || ctrl.warning;
  var flash = ctrl.getFlash();

  return [
    errorObj  ?  m('.alert.alert-danger', [
      m('p', errorObj.error ),
      m('p', errorObj.reason)
    ]) : null
  ]
}

