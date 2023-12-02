import Joi from 'joi';

const AreaIdCropIdSchema = Joi.object({
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    crop_id: Joi.string().uuid().required(),
  }),
});

export { AreaIdCropIdSchema };
