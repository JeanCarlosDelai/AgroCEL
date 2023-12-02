import Joi from 'joi';

const updatePropertySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    total_area: Joi.number(),
    cultivated_area: Joi.number(),
    city: Joi.string().max(50).min(4),
    state: Joi.string().max(50),
  }),
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});

export { updatePropertySchema };
