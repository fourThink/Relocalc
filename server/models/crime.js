var db = require('../lib/db.js')
var Promise = require('bluebird')
var createModel = require('../lib/create-model.js')

var Crime = module.exports = createModel('Crime', 'crimes', {});
