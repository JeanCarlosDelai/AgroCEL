import Joi from 'joi';

const CropIdSchema = Joi.object({
  params: Joi.object({
    crop_id: Joi.string().uuid().required(),
  }),
});

export { CropIdSchema };
