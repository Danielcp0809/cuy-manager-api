import { Audit } from 'src/modules/shared/entities/audit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cage } from './cages.entity';
import { Category } from './categories.entity';

@Entity('Breedings')
export class Breeding extends Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cage_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  male_cage_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  male_category_id: string;

  @Column({ type: 'int', nullable: false })
  male_quantity: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  female_cage_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  female_category_id: string;

  @Column({ type: 'int', nullable: false })
  female_quantity: number;

  @Column({ type: 'tinyint', width: 1, default: () => '0' })
  continuous_breeding: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  enterprise_id: string;

  @ManyToOne(() => Cage, (cage) => cage.breedings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cage_id' })
  cage: Cage;

  @ManyToOne(() => Cage)
  @JoinColumn({ name: 'male_cage_id' })
  male_cage: Cage;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'male_category_id' })
  male_category: Category;

  @ManyToOne(() => Cage)
  @JoinColumn({ name: 'female_cage_id' })
  female_cage: Cage;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'female_category_id' })
  female_category: Category;
}
