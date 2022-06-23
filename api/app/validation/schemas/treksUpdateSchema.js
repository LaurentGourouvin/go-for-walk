const joi = require('joi');

module.exports = joi.object({
  title: joi.string().optional(),
  description: joi.string().optional(),
  distance: joi.number().integer().optional(),
  duration: joi.number().integer().optional(),
  city: joi.string().optional(),
  coordinate: joi.array().optional(),
  pictures: joi.string().optional(),
}).min(1).required();
