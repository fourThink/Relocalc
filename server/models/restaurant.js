var db = require('../db/db.js')
var createModel = require('./create-model.js')

//Model for restaurants table
var Restaurant = module.exports = createModel('Restaurant', 'restaurants', {
  
  //returns promise for a list of inspections for a restaurant
  getInspections: function(id){
  	return db.select('r.name', 'ri.date', 'ri.score')
  	.from('restaurants as r')
  	.innerJoin('restaurant_inspections as ri', 'r.id', 'ri.restaurant_id')
  	.where('r.id', id)
  },

  

});
