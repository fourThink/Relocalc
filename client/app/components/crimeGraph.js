var m = require('mithril');

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {
    
        $(function () { 
            $('.crimeGraph').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Crime Comparison'
                },
                yAxis: {
                    title: {
                        text: 'Crimes Reported: Jan 2015 - Present'
                    }
                },
                series: [{
                    name: 'Your Search',
                    data: [13]
                }, {
                    name: 'City of Austin (average)',
                    data: [20]
                }]
            });
        });
  
  };

};

exports.view = function(ctrl, options) {
 return  m('.spacingDiv'), m('.col-sm-4 .crimeGraph', {config: ctrl.initialize});
};