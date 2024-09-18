import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoriesTable1726646239909 implements MigrationInterface {
    name = 'AddCategoriesTable1726646239909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Categories\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` decimal(10,2) NOT NULL, \`enterprise_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_9004ab74b495518b3dee4f4222\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_6cc01c356da31a286c0fc4750dd\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD CONSTRAINT \`FK_8b670814273f6ab7414041a46cc\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP FOREIGN KEY \`FK_8b670814273f6ab7414041a46cc\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_6cc01c356da31a286c0fc4750dd\``);
        await queryRunner.query(`DROP INDEX \`IDX_9004ab74b495518b3dee4f4222\` ON \`Categories\``);
        await queryRunner.query(`DROP TABLE \`Categories\``);
    }

}
