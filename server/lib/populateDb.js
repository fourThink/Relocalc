var db = require('./db.js')
var dataArray = require('./restaurants.js');
var Restaurant = require('../models/restaurant.js')
var RestaurantInspection = require('../models/restaurant_inspection.js')

//This file is created to populate restuartants and restaurant_inspections tables
var parseAddress = function (addr){
  var result = {
	  street: addr.match(/.*\n.*\n/)[0],
	  lat: addr.match(/-?\d{1,3}\.\d*\,/)[0].slice(0,-1),
	  long: addr.match(/-?\d{1,3}\.\d*\)/)[0].slice(0,-1),
  };
  return result;
}

var insertRestaurant = function(data){
  var addr = parseAddress(data.address);
  return Restaurant.create({
    facility_id: data.facility_id,
    name: data.name,
    address: addr.street,
    latitude: addr.lat,
    longitude: addr.long,
  });
}

var insertInspection = function (data){
  // return db('restaurant_inspections')
  // .insert({
  //   facility_id: data.facility_id,
  //   score: data.score,
  //   date: data.date,
  //   created_at: new Date(),
  //   updated_at: new Date()
  // })
  return RestaurantInspection.create({
    facility_id: data.facility_id,
    score: data.score,
    date: data.date,
  });
}


 var popluteTables = function (array){
  array.map(function (info) {
    return insertRestaurant(info)
    .then(function(){
     return insertInspection(info); 
    })
    .catch(function (){
      return insertInspection(info);
    })
  })
 }


popluteTables(dataArray);

