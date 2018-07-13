// Application Helper
var CustomError = require('./customerror');

isUniqueValidation = function(modelName, field) {
  return function(value, next) {
    var Model = require('../models')[modelName];
    var query = {};

    if (field == 'code') {
      value = value.replace(/\s/g,'');
      if (value.length != 4) {
        next(field + ' ' + value + ' length must be 4 character');
      }
    }
    console.log(Model, field)
    query[field] = value.toLowerCase().trim();
    Model.find({where: query, attributes: ["id"]}).then(function(obj) {
      if (obj) {
        next(field + ' ' + value + ' is already in use');
      } else {
        next();
      }
    })
  }
}

module.exports = {
  isUniqueValidation
}
