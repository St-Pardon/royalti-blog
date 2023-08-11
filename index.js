import { server } from './src/app.js';
import connectToMongoDB from './src/config/db.config.js';

connectToMongoDB();
server();
