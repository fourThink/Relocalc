var m = require('mithril');
var Location = require('../models/Location');

exports.controller = function(options) {
  ctrl = this;
  
  ctrl.initCrime = function (element, isInit, context) {
    
        //Initialize crime chart
        $(function () { 
            $('.crimeGraph').highcharts({
                colors: ['#7A878B', '#434348'],
                chart: {
                    type: 'column',
                    spacing: 50,
                },
                title: {
                    text: 'Crime Rate (Adjusted)'
                },
                yAxis: {
                    title: {
                        text: 'Crimes Reported: Jan 2015 - Present'
                    }
                },
                series: [{
                    name: 'Your Search',
                    data: [Math.floor(Location.search().crimeAvg)]
                }, {
                    name: 'City of Austin (average)',
                    data: [Math.floor(Location.search().cityCrimeAvg)]
                }]
            });
        });
  
  };

  ctrl.initRestSafety = function (element, isInit, context) {
    
        //Initialize restaurant safety chart
        $(function () { 
            $('.restaurantSafety').highcharts({
                colors: ['#7A878B', '#434348'],
                chart: {
                    type: 'column',
                    spacing: 50
                },
                title: {
                    text: 'Restaurant Score (Adjusted)'
                },
                yAxis: {
                    title: {
                        text: 'Average Health Inspection Rating (2015)'
                    }
                },
                series: [{
                    name: 'Your Search',
                    data: [Math.floor(Location.search().restAvg)]
                }, {
                    name: 'City of Austin (average)',
                    data: [Math.floor(Location.search().cityRestAvg)]
                }]
            });
        });
  
  };

  ctrl.initRestNumber = function (element, isInit, context) {
    
        //Initialize number of restaurants chart
        $(function () { 
            $('.restaurantNumber').highcharts({
                colors: ['#7A878B', '#434348'],
                chart: {
                    type: 'column',
                    spacing: 50
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
                    data: [Location.search().restaurants]
                }, {
                    name: 'City of Austin (average)',
                    data: Location.search().restaurants ? [51] : [0]
                }]
            });
        });
  
  };

};

exports.view = function(ctrl, options) {
 return  m('div', 
    [m('.col-sm-4 .crimeGraph', {config: ctrl.initCrime}),
     m('.col-sm-4 .restaurantSafety', {config: ctrl.initRestSafety}),
     m('.col-sm-4 .restaurantNumber', {config: ctrl.initRestNumber})
    ]);
};



