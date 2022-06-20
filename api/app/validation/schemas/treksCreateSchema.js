const joi = require('joi');

module.exports = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  distance: joi.number().integer(),
  duration: joi.number().integer().required(),
  city: joi.string().required(),
  coordinate: joi.string().optional(),
  files: joi.string().optional(),
  user_id: joi.number().required(),
  difficulty_id: joi.number().required(),
});
