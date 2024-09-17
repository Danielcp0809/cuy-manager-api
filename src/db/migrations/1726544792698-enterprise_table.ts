import { MigrationInterface, QueryRunner } from "typeorm";

export class EnterpriseTable1726544792698 implements MigrationInterface {
    name = 'EnterpriseTable1726544792698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Enterprises\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`is_enabled\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Enterprises\``);
    }

}
