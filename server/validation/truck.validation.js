const Joi = require('@hapi/joi');

module.exports = {
  create: Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    sizes: {
      width: Joi.number()
          .valid(170, 200)
          .required(),
      height: Joi.number()
          .valid(250, 350)
          .required(),
      length: Joi.number()
          .valid(300, 500, 700)
          .required(),
    },
    weight: Joi.number()
        .valid(1700, 2500, 4000)
        .required(),
    type: Joi.string()
        .valid('Sprinter', 'Small straight', 'Large straight')
        .required(),
  }),
  change: Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .regex(/[a-zA-Z0-9]{6,30}/)
        .required(),
  }),
};
