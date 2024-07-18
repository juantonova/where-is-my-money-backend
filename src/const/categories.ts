import { TransactionType } from 'src/models/common';

export const commonCategories: { type: TransactionType; name: string }[] = [
  {
    type: TransactionType.REVENUE,
    name: 'Зарплата',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Подработка',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Подарок',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Дивиденды',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Проценты',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Аренда',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Пенсия',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Пособие',
  },
  {
    type: TransactionType.REVENUE,
    name: 'Другое',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Продукты',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Транспорт',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Коммуналка',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Связь',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Кафе и рестораны',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Одежда',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Красота и здоровье',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Хобби',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Подарки',
  },
  {
    type: TransactionType.EXPENSE,
    name: 'Другое',
  },
];
