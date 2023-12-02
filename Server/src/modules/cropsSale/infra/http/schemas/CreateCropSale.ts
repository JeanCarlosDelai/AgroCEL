import Joi from 'joi';

const createCropSaleSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    purchasing_entity: Joi.string().required(),
    purchasing_entity_cnpj: Joi.string().required(),
    graduation: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    discharge_date: Joi.string().required(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    crop_id: Joi.string().uuid().required(),
  }),
});

export { createCropSaleSchema };
