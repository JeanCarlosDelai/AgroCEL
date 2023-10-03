import Joi from 'joi';

const updateCropSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    quantity: Joi.number(),
    crop_date: Joi.string(),
    crop_time: Joi.number(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    crop_id: Joi.string().uuid().required(),
  }),
});

export { updateCropSchema };
