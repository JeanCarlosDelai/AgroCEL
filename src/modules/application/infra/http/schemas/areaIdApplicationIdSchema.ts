import Joi from 'joi';

const AreaIdApplicationIdSchema = Joi.object({
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    application_id: Joi.string().uuid().required(),
  }),
});

export { AreaIdApplicationIdSchema };
