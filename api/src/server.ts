import express from 'express';
import sessions from 'express-session';
import { sequelize } from './database/database';
import { User } from './models';
import routes from './routes/v1/index';

const app = express();

app.use(express.json());
app.use(
  sessions({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use('/api', routes);
const PORT = process.env.PORT || 5050;

declare module 'express-session' {
  export interface SessionData {
    user_id: string | undefined;
  }
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

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
