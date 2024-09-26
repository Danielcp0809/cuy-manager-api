import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enterprise } from './enterprises.entity';
import { Counter } from './counters.entity';

@Entity('Categories')
export class Category extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'uuid', nullable: false })
  enterprise_id: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @OneToMany(() => Counter, (counter) => counter.cage, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  counters: Counter[];
}
