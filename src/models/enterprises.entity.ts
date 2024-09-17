import { Audit } from 'src/modules/shared/entities/audit.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Credentials } from './credentials.entity';

@Entity('Enterprises')
export class Enterprise extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'boolean', default: true })
  is_enabled: boolean;

  @OneToOne(() => Credentials, (credentials) => credentials.enterprise)
  credentials: Credentials;
}
