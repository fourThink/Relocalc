var m = require('mithril');
var Search = require('./components/searchBox');

window.Relocalc = {};

Relocalc.controller = function () {};

Relocalc.view = function (ctrl) {
  return [
    m.component(Search, {})
  ]
}

m.mount(document.getElementById('app'), Relocalc);