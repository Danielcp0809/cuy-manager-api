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
import { Breeding } from './breedings.entity';

@Entity('Cages')
export class Cage extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  code: string;

  @Column({ type: 'int', nullable: false })
  capacity: number;

  @Column({ type: 'uuid', nullable: false })
  enterprise_id: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.cages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;

  @OneToMany(() => Counter, (counter) => counter.cage, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  counters: Counter[];

  @OneToMany(() => Breeding, (breeding) => breeding.cage, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  breedings: Breeding[];
}
