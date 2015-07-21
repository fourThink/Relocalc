var db = require('./db.js')
var Promise = require('bluebird')
var util = require('util')


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

    // Updates a specific record by its id
    updateOne: function (attrs) {
      if (! attrs.id) {
        return Promise.reject(new Model.InvalidArgument('id_is_required'))
      }

      attrs.updated_at = new Date()
      return db(tablename).update(attrs).where({ id: attrs.id })
        .then(function(affectedCount) {
          return (affectedCount === 0) ? Promise.reject(new Model.NotFound) : attrs
        })
    },

    destroy: function (id) {
      return db(tablename).where({ id: id }).delete()
    },
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

  // Finally, mix in any extra methods from caller (see next section for an example)
  //return Object.assign(Model, extras);
  for (key in extras){
    Model[key] = extras[key]
  }
  return Model;

}