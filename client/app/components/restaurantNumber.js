var m = require('mithril');

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {
    
        $(function () { 
            $('.restaurantNumber').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Number of Restaurants'
                },
                yAxis: {
                    title: {
                        text: 'Restaurants per square mile'
                    }
                },
                series: [{
                    name: 'Your Search',
                    data: [25]
                }, {
                    name: 'City of Austin (average)',
                    data: [40]
                }]
            });
        });
  
  };

};

exports.view = function(ctrl, options) {
 return  m('.col-sm-4 .restaurantNumber', {config: ctrl.initialize});
};