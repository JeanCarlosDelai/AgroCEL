import Joi from 'joi';

const createAreaSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    species: Joi.string().required().max(50).min(1),
    variety: Joi.string().required().max(50).min(3),
    driving_system: Joi.string().required().max(50).min(3),
    rookstock_type: Joi.string().required().max(50).min(3),
    cultivated_area: Joi.number().required(),
    geographic_coordinates: Joi.string().required().min(3),
    // implementation_date: Joi.date().required().max(50).min(3),
    number_rows: Joi.number().required(),
    distance_between_rows: Joi.number().required(),
    distance_between_plants: Joi.number().required(),
    number_plants: Joi.number().required(),
  }),
  params: Joi.object({
    property_id: Joi.string().uuid().required(),
  }),
});

export { createAreaSchema };
