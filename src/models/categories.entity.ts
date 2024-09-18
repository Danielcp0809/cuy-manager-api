import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enterprise } from './enterprises.entity';

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

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.categories)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;
}
