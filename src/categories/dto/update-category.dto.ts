import { Category } from '../interfaces/category.interface';

export type UpdateCategoryDto = Partial<{
  name: Category['name'];
}>;
