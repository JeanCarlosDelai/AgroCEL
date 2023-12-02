import Joi from 'joi';

const propertyIdSchema = Joi.object({
  params: Joi.object({
    property_id: Joi.string().uuid().required(),
  }),
});

export { propertyIdSchema };
