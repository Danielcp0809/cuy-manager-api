import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryColorColumn1727398263901 implements MigrationInterface {
    name = 'AddCategoryColorColumn1727398263901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD \`color\` varchar(10) NOT NULL DEFAULT '#000000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP COLUMN \`color\``);
    }

}
