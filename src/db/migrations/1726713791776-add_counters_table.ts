import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountersTable1726713791776 implements MigrationInterface {
    name = 'AddCountersTable1726713791776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Counters\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`cage_id\` varchar(255) NOT NULL, \`category_id\` varchar(255) NOT NULL, \`amount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_93728ea20ac16dac5d951c2dfd8\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_5487d2de0219cfcc9408f4b5e46\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_5487d2de0219cfcc9408f4b5e46\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_93728ea20ac16dac5d951c2dfd8\``);
        await queryRunner.query(`DROP TABLE \`Counters\``);
    }

}
