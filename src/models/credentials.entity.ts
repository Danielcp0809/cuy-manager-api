import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Audit } from 'src/modules/shared/entities/audit.entity';
import { Enterprise } from './enterprises.entity';
@Entity('Credentials')
export class Credentials extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'tinyint', width: 1, default: () => '1' })
  reset_password: boolean;

  @OneToOne(() => Enterprise, (enterprise) => enterprise.credentials)
  @JoinColumn({ name: 'enterprise_id' })
  enterprise: Enterprise;
}
