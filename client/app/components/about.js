var m = require('mithril');

var About = module.exports = {};

About.controller = function(options){
  var ctrl = this;
};

About.view = function(ctrl, options){
  return  m('.container',
      [m('.row.searchesContainer',
          [m('.panel.panel.default.col-md-8.col-md-offset-2',
              [m('a.pull-right.redirect-link[href="/"]', {config: m.route}, "Return to main page"),
                m('.panel-header', [m('h3', "About")]),
                m('.panel-body',
                  [m('h4', "Service"),
                   m('p', "Relocalc provides openly-available data for a one-mile radius of a chosen location in" +
                       "the City of Austin."),
                   m('h4', "Open Data"),
                   m('p', [ "Visit ", m('a[href=https://data.austintexas.gov/]',"Austin's Open Data Portal "),
                   "for direct access to the data used in this application."])
                  ]
                )]
          )]
      )]
  )
};