import Joi from 'joi';

const updateAreaSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    species: Joi.string().max(50).min(2),
    variety: Joi.string().max(50).min(4),
    driving_system: Joi.string().max(50).min(4),
    rookstock_type: Joi.string().max(50).min(4),
    cultivated_area: Joi.number(),
    geographic_coordinates: Joi.string().max(50).min(4),
    implementation_date: Joi.date().min(4),
    number_rows: Joi.number(),
    distance_between_rows: Joi.number(),
    distance_between_plants: Joi.number(),
    number_plants: Joi.number(),
  }),
  params: Joi.object({
    property_id: Joi.string().uuid().required(),
    area_id: Joi.string().uuid().required(),
  }),
});

export { updateAreaSchema };
