import express from 'express';
import IndexRoute from './routes/index.route.js';
import helmet from 'helmet';
import { PORT } from './config/env.config.js';

const app = express();

const server = () => {
  app
    .use(helmet())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(IndexRoute)
    .listen(PORT, () => {
      console.log(`Server running on https://127.0.0.1:${PORT}`);
    });
};

export { server, app };
