import { TransactionType } from 'src/models/common';

export type Category = {
  id: number;
  user_id: number;
  type: TransactionType;
  name: string;
};
