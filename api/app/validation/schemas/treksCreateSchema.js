const joi = require('joi');

module.exports = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  distance: joi.number().integer(),
  duration: joi.number().integer().required(),
  city: joi.string().required(),
  coordinate: joi.array().items(joi.number()),
  pictures: joi.array().items(joi.string()),
}).required();