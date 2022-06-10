const joi = require('joi');

module.exports = joi.object({
  label: joi.string().required(),
}).required();
