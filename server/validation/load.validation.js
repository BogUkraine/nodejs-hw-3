const Joi = require('@hapi/joi');

module.exports = {
  create: Joi.object({
    status: Joi.string()
        .valid(
            'NEW',
            'POSTED',
            'ASSIGNED',
            'SHIPPED'),
    dimensions: {
      width: Joi.number()
          .min(1)
          .max(200)
          .required(),
      height: Joi.number()
          .min(1)
          .max(350)
          .required(),
      length: Joi.number()
          .min(1)
          .max(700)
          .required(),
    },
    state: Joi.string()
        .valid(
            'En route to Pick Up',
            'Arrived to Pick Up',
            'En route to Delivery',
            'Arrived to Delivery',
            'Waiting')
        .allow(null, ''),
    message: Joi.string().min(10).max(200).allow(''),
    payload: Joi.number()
        .min(1)
        .max(4500)
        .required(),
  }),
  change: Joi.object({
    dimensions: {
      width: Joi.number()
          .min(1)
          .max(200)
          .required(),
      height: Joi.number()
          .min(1)
          .max(350)
          .required(),
      length: Joi.number()
          .min(1)
          .max(700)
          .required(),
    },
    message: Joi.string().min(10).max(200).allow(''),
    payload: Joi.number()
        .min(1)
        .max(4500)
        .required(),
  }),
};
