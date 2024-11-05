import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cage } from './cages.entity';
import { Category } from './categories.entity';

@Entity('Deads')
export class Dead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  enterprise_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cage_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  unit_weight: number;

  @Column({ type: 'bigint' })
  date: number;

  @ManyToOne(() => Cage)
  @JoinColumn({ name: 'cage_id' })
  cage: Cage;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
