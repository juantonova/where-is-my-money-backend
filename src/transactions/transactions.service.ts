import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestErrors } from 'src/models/errors';

import { GetTransactionDto } from './dto/get-transaction.dto';
import { Transaction as TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from 'src/models/common';
import { Transaction } from './interfaces/transaction.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  private filterTransactionDate(
    transactions: TransactionEntity[],
    from: GetTransactionDto['from'],
    to: GetTransactionDto['to'],
  ) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return transactions.filter((tr) => {
      const trDate = new Date(tr.date);
      return trDate >= fromDate && trDate <= toDate;
    });
  }

  calculateTransactionsRest(transactions: Transaction[]) {
    let rest = 0;

    transactions.forEach((tr) => {
      tr.type === TransactionType.REVENUE && (rest += Number(tr.sum));
      tr.type === TransactionType.EXPENSE && (rest -= Number(tr.sum));
    });

    return rest;
  }

  async get(transactionOptions: GetTransactionDto) {
    const { user_id, account_id, from, to } = transactionOptions;
    if (!user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    let transactions = await this.repository.find({
      where: { user_id, account_id },
    });
    if (from || to || account_id) {
      transactions = this.filterTransactionDate(transactions, from, to);
    }

    return { transactions };
  }

  async createOne(transaction: CreateTransactionDto) {
    const { user_id, category_id, account_id, sum, date } = transaction || {};
    if (!user_id || !category_id || !account_id || !sum || !date) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const newTransaction = await this.repository.save(transaction);
    return { transaction: newTransaction };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const transaction = await this.repository.findOneBy({ id });
    if (transaction) {
      await this.repository.remove(transaction);
    }

    return { transaction_id: id };
  }

  async removeAllTransactions(filters: {
    user_id?: number;
    account_id?: number;
  }) {
    const { user_id, account_id } = filters;
    if (!user_id && !account_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const transactions = await this.repository.find({
      where: { user_id, account_id },
    });
    if (transactions) {
      await this.repository.remove(transactions);
    }

    return { transactions };
  }
}
