var m = require('mithril');

/**
 * Simple about page with no state
 * @type {{}}
 */
var About = module.exports = {};

About.controller = function(options){
  var ctrl = this;
};

About.view = function(ctrl, options){
  return  m('.container',
      [m('.row.searchesContainer',
          [m('.panel.panel.default.col-md-8.col-md-offset-2',
              [m('a.pull-right.redirect-link[href="/"]', {config: m.route}, "Return to main page"),
                m('h3', "About"),
                m('.panel-body',
                  [m('h3', "Service"),
                   m('p', "Relocalc provides openly-available data for a one-mile radius of a chosen location in " +
                       "the City of Austin."),
                   m('h3', "Open Data"),
                   m('p', [ "Visit ", m('a[href=https://data.austintexas.gov/]',"Austin's Open Data Portal "),
                   "for direct access to the data used in this application."]),
                   m('h3', "Methodology"),
                   m('p', "Relocalc determines a livability score for a certain address by combining user-specified "+
                    "weights for certain standard-of-living categories (e.g. the amount of crime in a certain area, "+
                    "or the average of an area's restaurant health inspections.)")
                  ]
                )]
          )]
      )]
  )
};