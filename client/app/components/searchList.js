var m = require('mithril');
var Searches = require('../models/Searches');

exports.controller = function (options) {
  ctrl = this;
  ctrl.searches = m.prop([]);
  ctrl.fetchUserSearchList = function() {
    return ctrl.searches([
      {
        address: "1110 Olive Street",
        rating: 78
      },
      {
        address: "234 Main Street",
        rating: 87
      }
    ])
  }
};


exports.view = function (ctrl, options) {
  return m('.container',
            [m('.row.searchesContainer',
              [m('.panel.panel.default.col-md-8.col-md-offset-2',
                [m('a.pull-right.redirect-link[href="/"]', "Return to main page", { config: m.route }), m('.panel-header', [m('h3', "Searches")]),
                 m('.panel-body',
                   [m('.list-group', [ctrl.fetchUserSearchList().map(function(search, index){
                      return m('.list-group-item', [
                        m('span', search.address),
                        m('span.pull-right', "Rating: " + search.rating)
                        ])
                      })]
                    )]
                  )]
              )]
            )]
        )

};
