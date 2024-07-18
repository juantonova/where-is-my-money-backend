import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  get(
    @Query('user_id') user_id: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.transactionsService.get({ user_id: Number(user_id), from, to });
  }

  @Post()
  post(@Body() createTransaction: CreateTransactionDto) {
    return this.transactionsService.createOne(createTransaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(Number(id));
  }
}
