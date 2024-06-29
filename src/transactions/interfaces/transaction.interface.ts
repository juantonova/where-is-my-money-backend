import { TransactionType } from 'src/models/common';

export type Transaction = {
  id: number;
  account_id: number;
  user_id: number;
  category_id: number;
  type: TransactionType;
  sum: number;
  date: string;
  name: string | null;
};
