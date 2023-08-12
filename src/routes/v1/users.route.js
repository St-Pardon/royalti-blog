import { Router } from 'express';
import UserController from '../../controllers/user.controller.js';
import passport from 'passport';

export const UserRoute = Router();

UserRoute.get('/:userid', UserController.getUserById)
  .put(
    '/',
    passport.authenticate('jwt', { session: false }),
    UserController.updateUserInfo
  )
  .delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    UserController.deleteUser
  );
