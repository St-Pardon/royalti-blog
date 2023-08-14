import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5010
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
export const HOSTNAME = process.env.HOSTNAME || 'http://127.0.0.1'
