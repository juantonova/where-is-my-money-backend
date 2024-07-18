import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  get(@Query('user_id') user_id: number) {
    return this.accountsService.getAllUserAccounts(Number(user_id));
  }

  @Post()
  post(@Body() createAccount: CreateAccountDto) {
    return this.accountsService.createOne(createAccount);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(Number(id));
  }
}
