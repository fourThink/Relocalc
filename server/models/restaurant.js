var db = require('../lib/db.js')
var Promise = require('bluebird')
var createModel = require('../lib/create-model.js')

var Restaurant = module.exports = createModel('Restaurant', 'restaurants', {
  print: function(name, location){
	return Restaurant.findBy({name: name})
	.then(function (restaurant) {
		console.log(restaurant);
		return restaurant;
    })
  }
});
