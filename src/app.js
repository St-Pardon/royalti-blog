import express from 'express';
import IndexRoute from './routes/index.route.js';
import helmet from 'helmet';
import './middlewares/auth.middleware.js';
import { PORT } from './config/env.config.js';
import { errHandler } from './middlewares/errorhandler.middleware.js';

const app = express();

app
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(IndexRoute)
  .use(errHandler)

const server = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
  });
};

export { server, app };
