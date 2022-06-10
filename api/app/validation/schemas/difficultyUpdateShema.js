const joi = require('joi');

module.exports = joi.object({
  label: joi.string(),
}).min(1).required();
