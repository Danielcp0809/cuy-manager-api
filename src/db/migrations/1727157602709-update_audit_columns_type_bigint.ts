import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuditColumnsTypeBigint1727157602709 implements MigrationInterface {
    name = 'UpdateAuditColumnsTypeBigint1727157602709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD \`created_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`created_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`updated_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD \`updated_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`created_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`updated_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD \`created_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD \`updated_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD \`created_at\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD \`updated_at\` bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP COLUMN \`created_at\``);
    }

}
