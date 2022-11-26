import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres'
});

export const migrator = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize
  }),
  logger: console
});

export type Migration = typeof migrator._types.migration;
