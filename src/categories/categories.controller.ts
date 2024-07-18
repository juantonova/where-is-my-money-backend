import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TransactionType } from 'src/models/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  get(@Query('user_id') user_id: number, @Query('type') type: TransactionType) {
    return this.categoriesService.get(Number(user_id), type);
  }

  @Get()
  getAll() {
    return this.categoriesService.getAll();
  }

  @Post()
  post(@Body() createCategory: CreateCategoryDto) {
    return this.categoriesService.createOne(createCategory);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategory: UpdateCategoryDto) {
    return this.categoriesService.update(Number(id), updateCategory);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(Number(id));
  }
}
