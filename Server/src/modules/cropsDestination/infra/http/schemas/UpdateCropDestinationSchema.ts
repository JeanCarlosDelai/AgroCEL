import Joi from 'joi';

const UpdateCropDestinationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    quantity: Joi.number(),
    destination: Joi.string().required(),
    processing_type: Joi.string().required(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    crop_id: Joi.string().uuid().required(),
    crop_destination_id: Joi.string().uuid().required(),
  }),
});

export { UpdateCropDestinationSchema };
