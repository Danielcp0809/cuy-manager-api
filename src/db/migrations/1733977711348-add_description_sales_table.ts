import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionSalesTable1733977711348 implements MigrationInterface {
    name = 'AddDescriptionSalesTable1733977711348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` DROP COLUMN \`description\``);
    }

}
