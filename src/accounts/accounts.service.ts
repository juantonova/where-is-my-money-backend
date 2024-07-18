import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BadRequestErrors } from 'src/models/errors';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Account as AccountType } from './interfaces/account.interface';
import { Transaction } from 'src/transactions/interfaces/transaction.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private repository: Repository<Account>,
    private transactionsService: TransactionsService,
  ) {}

  private calculateAccountRest(
    account: AccountType,
    transactions: Transaction[],
  ) {
    const accountTransactions = transactions.filter(
      (tr) => tr.account_id === account.id,
    );
    const transactionsRest =
      this.transactionsService.calculateTransactionsRest(accountTransactions);
    return { ...account, sum: Number(account.sum) + Number(transactionsRest) };
  }

  async getAllUserAccounts(user_id: number) {
    if (!user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const accounts = await this.repository.find({ where: { user_id } });
    const { transactions } = await this.transactionsService.get({ user_id });
    const accountsWithCalculatedRest = accounts.map((acc) => {
      return this.calculateAccountRest(acc, transactions);
    });

    return { accounts: accountsWithCalculatedRest };
  }

  async createOne(account: CreateAccountDto) {
    const { user_id, type, name, sum, currency } = account || {};
    if (!user_id || !type || !name || !sum || !currency) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const newAccount = await this.repository.save(account);
    return { account: newAccount };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const account = await this.repository.findOneBy({ id });
    await this.transactionsService.removeAllTransactions({ account_id: id });
    if (account) {
      await this.repository.remove(account);
    }

    return { account_id: id };
  }

  async removeAllUserAccounts(user_id: number) {
    if (!user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const accounts = await this.repository.find({ where: { user_id } });
    if (accounts) {
      await this.repository.remove(accounts);
    }

    return { accounts };
  }
}
