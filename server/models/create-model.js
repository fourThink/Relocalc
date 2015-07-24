var db = require('../db/db.js')
var Promise = require('bluebird')
var util = require('util')

//All models usee the exported function of the class to inherit from this general model
//The exported function returns an object that represents an instance of a db tables
//The function takes a name for each model instance, the name of the table in the db, and an  object that has any additional method needed for a particualar model
//The purpose of this file is to avoid writing the same functions common to all tables (DRY)
module.exports = function (modelName, tablename, extras) {

   // Initialize with methods common across all models
  var Model = {

    all: function () {
      return db(tablename).select('*')
    },

    // Finds a single record by id
    find: function (id) {
      return Model.findBy({ id: id })
    },

    // Finds a single record
    findBy: function (attrs) {
      return db(tablename).select('*').where(attrs).limit(1)
        .then(function(rows) {
          return (rows.length === 0) ? Promise.reject(new Model.NotFound) : rows[0]
        })
    },

    save: function (attrs) {
      return attrs.id ? Model.updateOne(attrs) : Model.create(attrs)
    },

    create: function (attrs) {
      attrs.created_at = new Date();
      attrs.updated_at = new Date();
      return db(tablename).insert(attrs).return(attrs)
    },

    // scan: function (lat, lng) {
    //   return db.select()
    //   .from(tablename)
    //   .where(tablename + '.type', '=', 'BURGLARY OF VEHICLE')
    //   .limit(5);
    // },

    // // Updates a specific record by its id
    // updateOne: function (attrs) {
    //   if (! attrs.id) {
    //     return Promise.reject(new Model.InvalidArgument('id_is_required'))
    //   }

    //   attrs.updated_at = new Date()
    //   return db(tablename).update(attrs).where({ id: attrs.id })
    //     .then(function(affectedCount) {
    //       return (affectedCount === 0) ? Promise.reject(new Model.NotFound) : attrs
    //     })
    // },

    // destroy: function (id) {
    //   return db(tablename).where({ id: id }).delete()
    // },
  }


  // Custom Errors (useful for handling via Promise#catch)
  Model.NotFound = function NotFound() {
    Error.captureStackTrace(this, this.constructor)
    this.name = 'NotFound'
    this.message = modelName + ': not found.'
  }
  util.inherits(Model.NotFound, Error)


  Model.InvalidArgument = function InvalidArgument(message) {
    Error.captureStackTrace(this, this.constructor)
    this.name = 'InvalidArgument'
    this.message = modelName + ': ' + message
  }
  util.inherits(Model.InvalidArgument, Error)

  //this is where extra functions are added to the model
  for (key in extras){
    Model[key] = extras[key]
  }
  return Model;

}