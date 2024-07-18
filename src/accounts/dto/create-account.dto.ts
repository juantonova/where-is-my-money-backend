import { Account } from '../interfaces/account.interface';

export type CreateAccountDto = Omit<Account, 'id'>;
