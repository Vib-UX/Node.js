import '@babel/polyfill';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';


dotenv.config({ path: './config.env' });

//cloud DB collection
const DB = process.env.DB_CLOUD.replace('<PASSWORD>',process.env.DB_PASSWORD)

// Local DB connection
// const DB = process.env.DB_LOCAL;

//DB connection
mongoose
  .connect(DB)
  .then((connection) => {
    console.log('DB connection is successfull');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App starts listening on port ${PORT}....`);
});
