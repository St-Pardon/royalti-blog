import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { userValidationMiddleware } from '../middlewares/validator.middleware.js';

const AuthRoute = Router();

AuthRoute.post('/signin', AuthController.signin).post(
  '/signup',
  userValidationMiddleware,
  AuthController.signup
);

export default AuthRoute;
