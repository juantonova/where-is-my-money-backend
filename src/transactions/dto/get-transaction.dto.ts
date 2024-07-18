export type GetTransactionDto = {
  user_id: number;
  account_id?: number;
  from?: string;
  to?: string;
  separate?: boolean;
};
