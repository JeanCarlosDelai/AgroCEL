import Joi from 'joi';

const propertyIdAreaIdSchema = Joi.object({
  params: Joi.object({
    property_id: Joi.string().uuid().required(),
    area_id: Joi.string().uuid().required(),
  }),
});

export { propertyIdAreaIdSchema };
