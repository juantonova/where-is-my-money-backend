import { Category } from '../interfaces/category.interface';

export type CreateCategoryDto = Omit<Category, 'id'>;
