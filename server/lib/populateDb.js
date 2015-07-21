var db = require('./db.js')
var restaurantArray = require('../data/restaurants.js');
var crimeArray = require('../data/crimes.js')
var Restaurant = require('../models/restaurant.js')
var RestaurantInspection = require('../models/restaurant_inspection.js')
var Crime = require('../models/crime.js')

//This file is created to populate restuartants and restaurant_inspections tables
var parseRestaurantAddress = function (addr){
  var result = {
	  street: addr.match(/.*\n.*\n/)[0],
	  lat: addr.match(/-?\d{1,3}\.\d*\,/)[0].slice(0,-1),
	  long: addr.match(/-?\d{1,3}\.\d*\)/)[0].slice(0,-1),
  };
  return result;
}

var insertRestaurant = function(data){
  var addr = parseRestaurantAddress(data.address);
  return Restaurant.create({
    id: data.facility_id,
    name: data.name,
    address: addr.street,
    latitude: addr.lat,
    longitude: addr.long,
  });
}

var insertRestaurantInspection = function (data){
  return RestaurantInspection.create({
    restaurant_id: data.facility_id,
    score: data.score,
    date: data.date,
  });
}

var insertCrime = function(data){
  return Crime.create({
    id: data.report_number,
    type: data.crime_type,
    street: data.address,
    city_state: 'AUSTIN, TX',
    latitude: data.latitude,
    longitude: data.longitude
  });
}

var popluteRestaurantTables = function (array){
  array.map(function (info) {
    return insertRestaurant(info)
    .then(function(){
     return insertRestaurantInspection(info); 
    })
    .catch(function (){
      return insertRestaurantInspection(info);
    })
  })
}

var populateCrimeTable = function(array){
  array.map(function (crime){
    return insertCrime(crime)
  });
}


popluteRestaurantTables(restaurantArray)
populateCrimeTable(crimeArray);
//console.log(dataArray.length + ', ' + crimeArray.length)