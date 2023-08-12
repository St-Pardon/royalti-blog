import passport from 'passport';
import { JWT_SECRET } from '../config/env.config.js';
import jwt from 'jsonwebtoken';

class AuthController {
  /**
   * signin controller for authenticating and logging in a user
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @param {NextFunction} next - the next funtion to trigger the next middleware
   * @author Onyedikachi Onu
   */
  static async signin(req, res, next) {
    passport.authenticate('signin', async (err, user) => {
      try {
        if (err) {
          return next(err);
        }
        if (!user) {
          const error = new Error('Username or password is incorrect');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, JWT_SECRET, {
            expiresIn: '48h',
          });
          return res
            .status(200)
            .json({ message: 'Signin successful', token, body });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }

  /**
   * signup controller for creation of a user account
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @param {NextFunction} next - the next funtion to trigger the next middleware
   * @author Onyedikachi Onu
   */
  static async signup(req, res, next) {
    passport.authenticate('signup', async (err, user) => {
      if (err) {
        res.status(403).send(err);
        return;
      }
      if (!user) {
        res.status(403).json({ err: 'User already exist' });
        return;
      }
      res.status(201).json({ msg: 'signup successful', user });
    })(req, res, next);
  }
}

export default AuthController;
