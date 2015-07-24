var browserify = require('browserify-middleware');
var bodyParser = require('body-parser')
var search = require('./lib/search.js')
var express = require('express');
var app = express()
//var db = require('./lib/db.js');
var Restaurant = require('./models/restaurant.js')

//provide a browserified f;ile at a path
var shared = ['mithril']
app.get('/js/vendor-bundle.js', browserify(shared));
app.get('/js/app-bundle.js', browserify('./client/app/index.js', { external: shared }));


// Non-js static files
app.use(bodyParser.json());
app.use(express.static('client/public'));

app.get('/restaurant', function (req, res){
 console.log('looking for restaurant!!')
 return Restaurant.getInspections('2801033')
 .then( function (restaurantList){
   res.json(restaurantList);
 })
});

app.get('/crimes', function (req, res){});

app.post('/', function (req, res){
  var data = {};
  var circle = {
  	latitude: req.body.lat,
  	longitude: req.body.lng,
  	meters: (req.body.radius || 1) / .00062137,
  }
  search('Crime', circle)
  .then(function (crimes){
  	data.crimes = crimes;
  })
  search('Restaurant', circle)
  .then(function (restaurants){
  	console.log(restaurants)
  	data.restaurants = restaurants
  	return res.json(data);
  })
})

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);