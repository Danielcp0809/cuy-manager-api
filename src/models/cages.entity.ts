import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enterprise } from './enterprises.entity';

@Entity('Cages')
export class Cages extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  code: string;

  @Column({ type: 'int', nullable: false })
  capacity: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.cages)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;
}
