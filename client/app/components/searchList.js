var m = require('mithril');
var Searches = require('../models/Searches');
var Auth = require('../models/Auth');

var searchList = module.exports = {};

searchList.controller = function (options) {
  ctrl = this;

  ctrl.searches = Searches.userSearches;

  ctrl.fetchUserSearchList = function() {
    setTimeout(Searches.fetchAllSearchesOfOneUser,500);
  };
};

/**
 * The config m.route for links ensures the whole page is not refreshed when link is clicked
 * @param ctrl
 * @param options
 */


searchList.view = function (ctrl, options) {
  if(window.checkUser()) {
    return m('.container',
        [m('.row.searchesContainer',
            [m('.panel.panel.default.col-md-8.col-md-offset-2',
                [m('a.pull-right.redirect-link[href="/"]', {config: m.route}, "Return to main page"), m('.panel-header', [m('h3', "Searches")]),
                  m('.panel-body',
                      renderList(ctrl)
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

function renderList(ctrl) {
  ctrl.fetchUserSearchList();
  return [m('.list-group', [ctrl.searches().map(function (address) {
        return m('.list-group-item', [
          m('span', address),
          m('span.pull-right', "Rating: " + "Coming soon")
        ])
      })]
  )]
};
