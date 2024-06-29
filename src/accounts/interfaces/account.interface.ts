import { AccountType, Currency } from 'src/models/common';

export type Account = {
  id: number;
  user_id: number;
  type: AccountType;
  name: string;
  sum: number;
  currency: Currency;
};
