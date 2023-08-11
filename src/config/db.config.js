import mongoose from 'mongoose';
import { MONGODB_URI } from './env.config.js';


/**
 * Connectionn function to a Mongo database using a URI string
 */
const connectToMongoDB = () => {
  mongoose.connect(MONGODB_URI);

  // Handles when a connection is established and successful
  mongoose.connection.on('connected', () =>
    console.log('Connection to mongodb successful')
  );

  // Handles when a connection is unsuccessful
  mongoose.connection.on('error', (err) =>
    console.log(`Error connecting to mongodb -> ${err}`)
  );
};

export default connectToMongoDB;
