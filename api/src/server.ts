import express from 'express';
import db from './database/database';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  console.log(`server is running on port: ${PORT}`);
  // testing sequalize connection
  try {
    await db.authenticate();
    console.log('database connection is successfull');
  } catch (error) {
    console.log(`error while connecting to database`, error);
  }
});
