import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category as CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestErrors, NotFoundErrors } from 'src/models/errors';
import { TransactionType } from 'src/models/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async get(user_id: number, type?: TransactionType) {
    if (!user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const categories = await this.repository.find({ where: { user_id, type } });
    return { categories };
  }

  async getAll() {
    const categories = await this.repository.find();
    return { categories };
  }

  async createOne(category: CreateCategoryDto) {
    const { user_id, type, name } = category || {};
    if (!user_id || !type || !name) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const newCategory = await this.repository.save(category);
    return { category: newCategory };
  }

  async createBaseUserCategories(
    user_id: number,
    categories: Omit<CreateCategoryDto, 'user_id'>[],
  ) {
    if (!categories.length) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }
    const userCategories = categories.map((category) => ({
      ...category,
      user_id,
    }));
    const newCategories = await this.repository.save(userCategories);
    return { categories: newCategories };
  }

  async update(id: number, category: UpdateCategoryDto) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const { name } = category || {};

    await this.repository.update(id, { name });
    const updatedCategory = await this.repository.findOneBy({ id });

    if (!updatedCategory) {
      throw new NotFoundException(NotFoundErrors.USER);
    }
    return { category };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const category = await this.repository.findOneBy({ id });
    if (category) {
      await this.repository.remove(category);
    }

    return { category_id: id };
  }

  async removeAllUserCategories(user_id: number) {
    if (!user_id) {
      throw new BadRequestException(BadRequestErrors.INVALID_REQUEST);
    }

    const categories = await this.repository.find({ where: { user_id } });
    if (categories) {
      await this.repository.remove(categories);
    }

    return { categories };
  }
}
