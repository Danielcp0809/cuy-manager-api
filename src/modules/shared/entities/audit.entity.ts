import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Audit extends BaseEntity {
  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;

  @Column()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;
}
