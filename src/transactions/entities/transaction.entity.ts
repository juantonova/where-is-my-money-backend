import { Account } from 'src/accounts/entities/account.entity';
import { Category } from 'src/categories/entities/category.entity';
import { TransactionType } from 'src/models/common';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Column({ type: 'integer' })
  user_id: number;

  @ManyToOne(() => Account)
  @Column({ type: 'integer' })
  account_id: number;

  @ManyToOne(() => Category)
  @Column({ type: 'integer' })
  category_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sum: number;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'varchar' })
  type: TransactionType;

  @Column({ type: 'varchar' })
  name: string | null;
}
