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
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Column({ type: 'integer' })
  user_id: number;

  @Column({ type: 'varchar', length: 50 })
  type: TransactionType;

  @Column({ type: 'varchar', length: 50 })
  name: string | null;
}
