import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveContinousBreadingAddMonthsDuration1733435200838 implements MigrationInterface {
    name = 'RemoveContinousBreadingAddMonthsDuration1733435200838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP COLUMN \`continuous_breeding\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD \`months_duration\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Breedings\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP COLUMN \`months_duration\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD \`continuous_breeding\` tinyint(1) NOT NULL DEFAULT '0'`);
    }

}
