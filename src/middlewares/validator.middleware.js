import { postValidator } from '../validators/post.validator.js';
import { userValidator } from '../validators/user.validator.js';

export const postValidationMiddleware = async (req, res, next) => {
  const post = req.body;
  const user = req.user;

  const data = { ...post, ...user };

  try {
    await postValidator.validateAsync(data);
    next();
  } catch (error) {
    return res.status(406).send(error.details[0].message);
  }
};

export const userValidationMiddleware = async (req, res, next) => {
  const user = req.body;
  try {
    await userValidator.validateAsync(user);
    next();
  } catch (error) {
    return res.status(406).send(error.details[0].message);
  }
};
