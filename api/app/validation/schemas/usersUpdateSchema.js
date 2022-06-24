const joi = require('joi');

module.exports = joi.object({
  firstname: joi.string().optional(),
  name: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().optional(),
  files: joi.string().optional(),
}).min(1).required();
