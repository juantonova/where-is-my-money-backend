import { Transaction } from '../interfaces/transaction.interface';

export type CreateTransactionDto = Omit<Transaction, 'id'>;
