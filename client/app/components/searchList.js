var m = require('mithril');

exports.controller = function (options) {
  ctrl = this;
  ctrl.fetchUserList = function() {};
};

exports.view = function (ctrl, options) {
  return m('.container', [m('panel.panel-default', "this is the list")])
};