import joi from 'joi';

export const postValidator = joi.object({
  username: joi.string().min(2).max(255).required(),
  first_name: joi.string().min(2).max(255).required(),
  last_name: joi.string().min(2).max(255).required(),
  email: joi.string().email().required().label('Email').messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?]+$'))
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        'Password must contain at least one special character or number',
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  city: joi.string(),
  created_at: joi.date().default(Date.now()),
  updated_at: joi.date().default(Date.now()),
});
