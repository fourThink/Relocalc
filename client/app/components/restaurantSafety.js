var m = require('mithril');

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {
    
        $(function () { 
            $('.restaurantSafety').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Restaurant Safety'
                },
                yAxis: {
                    title: {
                        text: 'Average Health Inspection Rating (2015)'
                    }
                },
                series: [{
                    name: 'Your Search',
                    data: [85]
                }, {
                    name: 'City of Austin (average)',
                    data: [70]
                }]
            });
        });
  
  };

};

exports.view = function(ctrl, options) {
 return  m('.col-sm-4 .restaurantSafety', {config: ctrl.initialize});
};