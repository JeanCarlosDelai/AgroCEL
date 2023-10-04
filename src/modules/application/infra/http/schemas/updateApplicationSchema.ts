import Joi from 'joi';

const updateApplciationSchema = Joi.object({
  body: Joi.object({
    quantity: Joi.number(),
    application_type: Joi.string(),
    used_product_id: Joi.string(),
    description: Joi.string(),
    application_date: Joi.string(),
    application_time: Joi.number(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    application_id: Joi.string().uuid().required(),
  }),
});

export { updateApplciationSchema };
