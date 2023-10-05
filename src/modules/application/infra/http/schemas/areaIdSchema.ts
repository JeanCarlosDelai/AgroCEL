import Joi from 'joi';

const areaIdSchema = Joi.object({
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
  }),
});

export { areaIdSchema };
