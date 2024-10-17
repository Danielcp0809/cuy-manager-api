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

@Entity('Sales')
export class Sale extends Audit {
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
  unit_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  unit_weight: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Cage, (cage) => cage.sales)
  @JoinColumn({ name: 'cage_id' })
  cage: Cage;
}
