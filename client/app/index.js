var m = require('mithril')
var MyComponent = require('./components/MyComponent')


window.App = {}

App.controller = function () {}

App.view = function (ctrl) {
  return [
    m('h1', 'Relocalc'),
    m.component(MyComponent, { title: 'Know the risks before relocating!' })
  ]
}

m.mount(document.getElementById('app'), App)