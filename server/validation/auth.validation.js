const Joi = require('@hapi/joi');

module.exports = {
  register: Joi.object({
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).regex(/[a-zA-Z0-9]{6,30}/).required(),
    role: Joi.string().valid('Shipper', 'Driver').required(),
  }),
  login: Joi.object({
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).regex(/[a-zA-Z0-9]{6,30}/).required(),
    role: Joi.string().valid('Shipper', 'Driver').required(),
  }),
};
