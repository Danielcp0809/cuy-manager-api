import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntrepriseIdInSalesTable1729140046563 implements MigrationInterface {
    name = 'AddEntrepriseIdInSalesTable1729140046563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` ADD \`enterprise_id\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` DROP COLUMN \`enterprise_id\``);
    }

}
