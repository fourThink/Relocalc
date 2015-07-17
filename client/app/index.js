var m = require('mithril');
var SearchBox = require('./components/searchBox');
var Map = require('./components/mapContainer');

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

m.mount(document.getElementById('app'), Relocalc);

// m.route(document.getElementById('app'), '/', {
//   '/': Relocalc,
//   '/results': ResultsComponent
// });
