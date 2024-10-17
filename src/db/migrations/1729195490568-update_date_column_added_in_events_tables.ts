import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateColumnAddedInEventsTables1729195490568 implements MigrationInterface {
    name = 'UpdateDateColumnAddedInEventsTables1729195490568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD \`date\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Purchases\` ADD \`date\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Sales\` ADD \`date\` bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`Purchases\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP COLUMN \`date\``);
    }

}
