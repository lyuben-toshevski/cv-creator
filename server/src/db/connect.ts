import { CREDENTIALS } from '@source/credentials';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  CREDENTIALS.DATABASE_NAME,
  CREDENTIALS.DATABASE_USERNAME,
  CREDENTIALS.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);
