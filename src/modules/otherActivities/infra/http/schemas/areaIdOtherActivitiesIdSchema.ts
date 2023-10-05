import Joi from 'joi';

const AreaIdOtherActivitiesIdSchema = Joi.object({
  params: Joi.object({
    area_id: Joi.string().uuid().required(),
    other_activities_id: Joi.string().uuid().required(),
  }),
});

export { AreaIdOtherActivitiesIdSchema };
