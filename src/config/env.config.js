import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5010
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

