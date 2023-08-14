import { Router } from 'express';
import AuthRoute from './auth.route.js';
import { UserRoute } from './v1/users.route.js';
import { PostRoute } from './v1/posts.route.js';
import { CommentRoute } from './v1/comment.route.js';

const IndexRoute = Router();
const baseURI = '/api/v1';

IndexRoute.get('/', (req, res) => {
  res.json({
    message:
      'Welcome to royalti blog, please refer to the API documentation to get started',
  });
})
  .use(`/auth`, AuthRoute)
  .use(`${baseURI}/user`, UserRoute)
  .use(`${baseURI}/post`, PostRoute)
  .use(`${baseURI}/comment`, CommentRoute);

export default IndexRoute;
