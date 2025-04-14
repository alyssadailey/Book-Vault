import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

mongoose.connect(mongoURI);

export default mongoose.connection;
