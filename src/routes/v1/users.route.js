import { Router } from 'express';
import UserController from '../../controllers/user.controller.js';
import passport from 'passport';

export const UserRoute = Router();

UserRoute.get('/:id', UserController.getUserById)
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    UserController.updateUserInfo
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    UserController.deleteUser
  );
