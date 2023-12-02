import Joi from 'joi';

const paramsIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
});

export { paramsIdSchema };
