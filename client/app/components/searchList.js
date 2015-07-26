var m = require('mithril');
var Searches = require('../models/Searches');

exports.controller = function (options) {
  ctrl = this;
  ctrl.searches = Searches.userSearches();
  ctrl.fetchUserSearchList = function() {
    return ctrl.searches;
  };
};

/**
 * The config m.route for links ensures the whole page is not refreshed when link is clicked
 * @param ctrl
 * @param options
 */


exports.view = function (ctrl, options) {
  if(window.checkUser()) {
    return m('.container',
        [m('.row.searchesContainer',
            [m('.panel.panel.default.col-md-8.col-md-offset-2',
                [m('a.pull-right.redirect-link[href="/"]', "Return to main page", {config: m.route}), m('.panel-header', [m('h3', "Searches")]),
                  m('.panel-body',
                      [m('.list-group', [ctrl.fetchUserSearchList().map(function (address) {
                            return m('.list-group-item', [
                              m('span', address),
                              m('span.pull-right', "Rating: " + "Coming soon")
                            ])
                          })]
                      )]
                  )]
            )]
        )]
    )
  }
  else {
    return m('.container',
        [m('.row.searchesContainer',
            [m('.panel.panel.default.col-md-8.col-md-offset-2.text-center', [
                m('h3', "You must be logged in to see your searches")
            ]
            )]
        )]
    )
  }
};
