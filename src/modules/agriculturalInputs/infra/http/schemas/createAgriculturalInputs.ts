import Joi from 'joi';

const createAgriculturalInputsSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    benefit: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

export { createAgriculturalInputsSchema };
