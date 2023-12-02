import Joi from 'joi';

const createApplicationSchema = Joi.object({
  body: Joi.object({
    quantity: Joi.number(),
    application_type: Joi.string().required(),
    used_product: Joi.string().required(),
    description: Joi.string().required(),
    application_date: Joi.string().required(),
    application_time: Joi.number().required(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
  }),
});

export { createApplicationSchema };
