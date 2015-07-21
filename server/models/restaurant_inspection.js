var db = require('../lib/db.js')
var Promise = require('bluebird')
var createModel = require('../lib/create-model.js')

var RestaurantInspection = module.exports = createModel('RestaurantInspection', 'restaurant_inspections', {});
