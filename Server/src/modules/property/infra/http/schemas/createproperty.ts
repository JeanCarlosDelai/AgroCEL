import Joi from 'joi';

const createPropertySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    total_area: Joi.number().required(),
    cultivated_area: Joi.number().required(),
    city: Joi.string().required().max(50).min(4),
    state: Joi.string().required().max(50),
  }),
});

export { createPropertySchema };
