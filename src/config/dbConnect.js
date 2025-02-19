import mongoose from 'mongoose';

const dbConnect = async () => {
  // get default connection
  const db = mongoose.connection;

  db.on('error', () => {
    console.error(`Error while connecting to Mongo DB ${err.message}`);
  });

  db.once('open', () => {
    console.error('Connected to Mongo DB 👍');
  });

  await mongoose.connect('mongodb://localhost:27017/node-mongo');
};

export default dbConnect;
