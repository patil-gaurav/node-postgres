
isUniqueValidation = function(modelName, field) {
  return function(value, next) {
    var Model = require('../models')[modelName];
    var query = {};
    query[field] = value.toLowerCase().trim();
    Model.find({where: query, attributes: ["id"]}).then(function(obj) {
      if (obj) {
        next(field + ' ' + value + ' is already in use');
      } {
        next();
      }
    })
  }
}

module.exports = {
  isUniqueValidation
}
