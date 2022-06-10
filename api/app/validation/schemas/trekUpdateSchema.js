const joi = require('joi');

module.exports = joi.object({
  title: joi.string(),
  description: joi.string(),
  distance: joi.number().integer(),
  duration: joi.number().integer(),
  city: joi.string(),
  coordinate: joi.number().integer(),
  pictures: joi.string(),
}).min(1).required();
