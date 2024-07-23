import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { Category } from 'src/categories/entities/category.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: `${process.env.DB_URL}`,
  synchronize: true,
  logging: true,
  entities: [User, Category, Account, Transaction],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
};

export default dataSourceOptions;
