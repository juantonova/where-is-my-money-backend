import { AccountType, Currency } from 'src/models/common';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'varchar', length: 10 })
  type: AccountType;

  @Column({ type: 'varchar', length: 50 })
  name: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sum: number;

  @Column({ type: 'varchar', length: 3 })
  currency: Currency;
}
