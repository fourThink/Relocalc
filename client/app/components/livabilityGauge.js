var m = require('mithril');
var Location = require('../models/Location');

// var scoreCalculator = function() {
//     var numCrimes = Location.search().crimes;
//     var restScore = Location.search().restAvg;
//     var crimeWeight = Number(Location.crimeWeight());
//     var restWeight = Number(Location.restWeight());
//     var crimeScore, overallScore;

//     var totalWeight = crimeWeight + restWeight;

//     //if crimeWeight and restWeight don't add up to 10, weight them both equally
//     if (totalWeight !== 10) {
//         crimeWeight = 5;
//         restWeight = 5;
//     }

//     crimeScore = Math.floor((numCrimes / 1300) * 100 * -1 + 100);

//     overallScore = Math.floor( (crimeScore * (crimeWeight/10)) +  (restScore * (restWeight/10)) );

//     return overallScore;
// };

exports.controller = function(options) {
  ctrl = this;

  ctrl.initialize = function (element, isInit, context) {
    
    $(function () {

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

        // the value axis
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

    // The speed gauge
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
            data: [Location.search().livability],
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