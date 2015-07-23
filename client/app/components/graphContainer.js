var m = require('mithril');

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
 return  m('div', 
    [m('.col-sm-4 .crimeGraph', {config: ctrl.initCrime}),
     m('.col-sm-4 .restaurantSafety', {config: ctrl.initRestSafety}),
     m('.col-sm-4 .restaurantNumber', {config: ctrl.initRestNumber})
    ]);
};



