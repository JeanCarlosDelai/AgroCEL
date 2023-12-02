import Joi from 'joi';

const createOtherActivitiesSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().max(50).min(4),
    activitie_category: Joi.string().required(),
    activitie_date: Joi.string().required(),
    activitie_time: Joi.number().required(),
    description: Joi.string().required(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
  }),
});

export { createOtherActivitiesSchema };
