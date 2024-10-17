import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { Cage } from './cages.entity';

@Entity('Purchases')
export class Purchase extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  enterprise_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cage_id: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  weight: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_price: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Cage, (cage) => cage.purchases)
  @JoinColumn({ name: 'cage_id' })
  cage: Cage;
}
