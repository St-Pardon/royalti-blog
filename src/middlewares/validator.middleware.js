import { commentValidator } from '../validators/comment.validator.js';
import { postValidator } from '../validators/post.validator.js';
import { userValidator } from '../validators/user.validator.js';

export const postValidationMiddleware = async (req, res, next) => {
  const post = req.body;
  const { _id: userid } = req.user;

  const data = { ...post, userid };

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

export const commentValidationMiddleware = async (req, res, next) => {
  const comment = req.body;
  const { _id: userid } = req.user;

  const data = { ...comment, userid };

  try {
    await commentValidator.validateAsync(data);
    next();
  } catch (error) {
    return res.status(406).send(error.details[0].message);
  }
};
