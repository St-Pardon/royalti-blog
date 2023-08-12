import joi from 'joi';

export const userValidator = joi.object({
  title: joi.string().min(5).max(255).required(),
  description: joi.string().min(5).max(1000).optional(),
  author: joi.string().required(),
  body: joi.string().min(10).required(),
  userid: joi.string().required(),
  created_at: joi.date().default(Date.now()),
  updated_at: joi.date().default(Date.now()),
});
