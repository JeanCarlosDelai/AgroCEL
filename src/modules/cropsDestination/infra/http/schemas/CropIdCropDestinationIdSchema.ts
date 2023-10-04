import Joi from 'joi';

const CropIdCropDestinationIdSchema = Joi.object({
  params: Joi.object({
    crop_id: Joi.string().uuid().required(),
    crop_destination_id: Joi.string().uuid().required(),
  }),
});

export { CropIdCropDestinationIdSchema };
