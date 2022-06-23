const joi = require('joi');

module.exports = joi.object({
  label: joi.string().optional(),
}).min(1).required();
