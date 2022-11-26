import express from 'express';
import { sequelize } from './database/database';
import User from './models/user';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  console.log(`server is running on port: ${PORT}`);
  // testing sequalize connection
  try {
    await sequelize.authenticate();
    console.log('database connection is successfull');
  } catch (error) {
    console.log(`error while connecting to database`, error);
  }
});
