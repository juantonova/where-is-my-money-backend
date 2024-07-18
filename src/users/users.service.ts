/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestErrors, NotFoundErrors } from 'src/models/errors';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserResponse } from './interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';
import { CategoriesService } from 'src/categories/categories.service';
import { commonCategories } from 'src/const/categories';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
  ) {}

  private updateUserInfoForResponse(user: User): UserResponse {
    const { password, ...userInfo } = user;
    return { user: userInfo };
  }

  private hashPassword(password: User['password']) {
    return hashSync(password, genSaltSync(2));
  }

  async get(id: number) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(NotFoundErrors.USER);
    }
    return user;
  }

  async getAll() {
    const users = await this.repository.find();
    return { users };
  }

  async create(user: CreateUserDto) {
    const { login, password } = user;
    if (!login || !password) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const newUser = await this.repository.save({
      ...user,
      password: this.hashPassword(password),
    });
    await this.categoriesService.createBaseUserCategories(
      newUser.id,
      commonCategories,
    );
    return this.updateUserInfoForResponse(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id || !updateUserDto) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    await this.repository.update(id, updateUserDto);
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(NotFoundErrors.USER);
    }
    return this.updateUserInfoForResponse(user);
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const user = await this.repository.findOneBy({ id });
    await this.categoriesService.removeAllUserCategories(id);
    await this.accountsService.removeAllUserAccounts(id);
    await this.transactionsService.removeAllTransactions({ user_id: id });
    if (user) {
      await this.repository.remove(user);
    }

    return { user_id: id };
  }
}
