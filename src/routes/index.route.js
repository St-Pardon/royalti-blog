import { Router } from 'express';
import AuthRoute from './auth.route.js';

const IndexRoute = Router();
const baseURI = 'api/v1';

IndexRoute.use(`/auth`, AuthRoute)
// .use(`${baseURI}/user`).use(`${baseURI}/posts`);

export default IndexRoute;
