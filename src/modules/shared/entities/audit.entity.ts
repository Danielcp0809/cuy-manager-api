import { BaseEntity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export class Audit extends BaseEntity {
  @Column({ type: 'bigint' })
  created_at: number;

  @Column({ type: 'bigint' })
  updated_at: number;

  @BeforeInsert()
  setTimestamps() {
    const epoch = Date.now();
    this.created_at = epoch;
    this.updated_at = epoch;
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = Date.now();
  }
}
