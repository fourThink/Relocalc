var m = require('mithril');
var SearchBox = require('./components/searchBox');
var Map = require('./components/mapContainer');
var SearchList = require('./components/searchList');
var Signup = require('./components/signup');
var Location = require('./models/Location');

window.Relocalc = {};

Relocalc.controller = function () {
  var ctrl = this;
  ctrl.location = Location.vm();
};

Relocalc.view = function (ctrl) {
  return [
    m.component(SearchBox, { location: ctrl.location }),
    m.component(Map, { location: ctrl.location })
  ]
}

/**
 * ROUTING
 */

m.route.mode = "hash";

m.route(document.getElementById('app'), "/", {
  "/": Relocalc,
  "/signup": Signup,
  "/searches/:userID": SearchList
});
