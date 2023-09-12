import Joi from 'joi';

const updateProfileSchema = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
  }),
});

export { updateProfileSchema };
