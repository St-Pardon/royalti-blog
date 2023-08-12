import { userValidator } from '../validators/post.validator.js';
import { postValidator } from '../validators/user.validator.js';

export const postValidationMiddleware = async (req, res, next) => {
  const post = req.body;
  try {
    await postValidator.validateAsync(post);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

export const userValidationMiddleware = async (req, res, next) => {
  const post = req.body;
  try {
    await userValidator.validateAsync(post);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};
