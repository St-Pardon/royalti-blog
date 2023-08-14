import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';

export { localStrategy, JWTstrategy, ExtractJwt, AnonymousStrategy };
