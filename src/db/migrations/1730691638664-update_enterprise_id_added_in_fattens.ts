import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEnterpriseIdAddedInFattens1730691638664 implements MigrationInterface {
    name = 'UpdateEnterpriseIdAddedInFattens1730691638664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Fattens\` ADD \`enterprise_id\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Fattens\` DROP COLUMN \`enterprise_id\``);
    }

}
