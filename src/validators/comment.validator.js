import joi from 'joi';

export const commentValidator = joi.object({
  postid: joi.string().required(),
  userid: joi.string(),
  comment: joi.string().min(1).max(1000).required(),
});
