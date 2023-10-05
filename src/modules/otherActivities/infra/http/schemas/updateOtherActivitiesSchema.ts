import Joi from 'joi';

const updateOtherActivitiesSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().max(50).min(4),
    activitie_category: Joi.string(),
    activitie_date: Joi.string(),
    activitie_time: Joi.number(),
    description: Joi.string(),
  }),
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    other_activities_id: Joi.string().uuid().required(),
  }),
});

export { updateOtherActivitiesSchema };
