import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cage } from './cages.entity';
import { Category } from './categories.entity';

@Entity('Counters')
export class Counter extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  cage_id: string;

  @Column({ type: 'uuid', nullable: false })
  category_id: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(() => Cage, (cage) => cage.counters, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cage_id' })
  cage: Cage;

  @ManyToOne(() => Category, (category) => category.counters, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
