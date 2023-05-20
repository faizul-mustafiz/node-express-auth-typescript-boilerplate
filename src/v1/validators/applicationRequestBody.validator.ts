import Joi from 'joi';

export const applicationCreateRequestBody = Joi.object({
  appName: Joi.string().required(),
  origin: Joi.string(),
  appUser: Joi.string(),
  status: Joi.string(),
}).required();

export const applicationUpdateRequestBody = Joi.object({
  appName: Joi.string(),
  origin: Joi.string(),
  appUser: Joi.string(),
  status: Joi.string(),
})
  .required()
  .min(1);
