import passport from 'passport';
import {
  localStrategy,
  ExtractJwt,
  JWTstrategy,
} from '../services/passport.service.js';
import { JWT_SECRET } from '../config/env.config.js';
import { UserModel } from '../models/users.model.js';

passport
  .use(
    new JWTstrategy(
      {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        jsonWebTokenOptions: {
          maxAge: '48h',
        },
      },
      async (token, done) => {
        try {
          return await done(null, token.user);
        } catch (err) {
          done(err);
        }
      }
    )
  )

  .use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { username, ...data } = req.body;

          // checks if user's username or email already exist
          const checkUsername = await UserModel.findOne({ username });
          const checkMail = await UserModel.findOne({ email });

          if (checkUsername) {
            return done(null, false, { message: 'Username already exist' });
          }

          if (checkMail) {
            return done(null, false, { message: 'Email already exist' });
          }

          const user = await UserModel.create({ ...data, username, email, password });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  )

  .use(
    'signin',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = email.includes('@')
            ? await UserModel.findOne({ email })
            : await UserModel.findOne({ username: email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
