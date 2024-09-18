import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCagesTable1726639162091 implements MigrationInterface {
    name = 'AddCagesTable1726639162091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8fd5db8b81fbafa6c80b4b6b25\` ON \`Credentials\``);
        await queryRunner.query(`CREATE TABLE \`Cages\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`enterprise_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_50d241773b924bdd38c725d25f\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD CONSTRAINT \`FK_8b670814273f6ab7414041a46cc\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP FOREIGN KEY \`FK_8b670814273f6ab7414041a46cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_50d241773b924bdd38c725d25f\` ON \`Cages\``);
        await queryRunner.query(`DROP TABLE \`Cages\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8fd5db8b81fbafa6c80b4b6b25\` ON \`Credentials\` (\`password\`)`);
    }

}
