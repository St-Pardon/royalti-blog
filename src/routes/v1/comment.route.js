import { Router } from 'express';
import passport from 'passport';
import { CommentController } from '../../controllers/comment.controller';

export const CommentRoute = Router();

CommentRoute.post(
  '/new',
  passport.authenticate(['jwt', 'anonymous'], { session: false }),
  CommentController.createComment
)
  .get('/post/:postid', CommentController.getAllCommentForPost)
  .get('/:commentid', CommentController.getCommentById)
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    CommentController.deleteComment
  );
