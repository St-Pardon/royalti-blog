import { Router } from 'express';
import passport from 'passport';
import PostController from '../../controllers/post.controller.js';
import { postValidationMiddleware } from '../../middlewares/validator.middleware.js';

export const PostRoute = Router();

PostRoute.get('/all', PostController.getAllPosts)
  .post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    postValidationMiddleware,
    PostController.createPost
  )
  .get(
    '/user',
    passport.authenticate('jwt', { session: false }),
    PostController.getPostByUser
  )
  .get('/:postid', PostController.getPostById)
  .put(
    '/publish/:postid',
    passport.authenticate('jwt', { session: false }),
    PostController.publishPost
  )
  .put(
    '/unpublish/:postid',
    passport.authenticate('jwt', { session: false }),
    PostController.unpublishPost
  )
  .patch(
    '/update/:postid',
    passport.authenticate('jwt', { session: false }),
    PostController.updatePost
  )
  .delete(
    '/:postid',
    passport.authenticate('jwt', { session: false }),
    PostController.deletePost
  );
