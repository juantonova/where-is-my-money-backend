import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { Category } from 'src/categories/entities/category.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // url: `${process.env.DB_URL}`,
  // delete after moving database
  host: `${process.env.DB_HOST}`,
  port: parseInt(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  synchronize: true,
  logging: true,
  entities: [User, Category, Account, Transaction],
  migrations: [],
  subscribers: [],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export default dataSourceOptions;
