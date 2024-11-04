import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { Cage } from './cages.entity';

@Entity('Fattens')
export class Fattens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  origin_cage_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  destiny_cage_id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'bigint' })
  date: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Cage)
  @JoinColumn({ name: 'origin_cage_id' })
  origin_cage: Cage;

  @ManyToOne(() => Cage)
  @JoinColumn({ name: 'destiny_cage_id' })
  destiny_cage: Cage;
}
