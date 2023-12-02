import Joi from 'joi';

const CropIdCropSaleIdSchema = Joi.object({
  params: Joi.object({
    crop_id: Joi.string().uuid().required(),
    crop_sale_id: Joi.string().uuid().required(),
  }),
});

export { CropIdCropSaleIdSchema };
