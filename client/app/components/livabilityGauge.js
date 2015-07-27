var m = require('mithril');
var Location = require('../models/Location');

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {
    
    $(function () {

      //these options affect the look of the gauge
      var gaugeOptions = {

        chart: {
            type: 'solidgauge',
            spacing: 50
        },

        title: {
          text: 'Livability Score',
          style: {
            'color':'#000',
            'fontSize':'36px',
          },
          y: 40
        },

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis -- adjust color
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // attach the gauge to the DOM filling it out with gaugeOptions
    $('.gaugeContainer').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Score'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Score',
            data: [Math.floor(Location.search().livability) || 0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:48px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">Based on your search criteria</span></div>'
            }
        }]

    }));

    });
  
  };

};

exports.view = function(ctrl, options) {
 return  m('.col-sm-6 .gaugeContainer', {config: ctrl.initialize});
};