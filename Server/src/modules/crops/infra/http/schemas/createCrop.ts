import Joi from 'joi';

const createCropSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    quantity: Joi.number(),
    crop_date: Joi.string().required(),
    crop_time: Joi.number().required(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
  }),
});

export { createCropSchema };
