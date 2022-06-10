const joi = require('joi');

module.exports = joi.object({
  firstname: joi.string(),
  name: joi.string(),
  email: joi.string().email(),
  password: joi.string(),
}).min(1).required();
