import Joi from 'joi';

const sessionTokenSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export { sessionTokenSchema };
