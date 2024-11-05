import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeadsTable1730778765738 implements MigrationInterface {
    name = 'AddDeadsTable1730778765738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Deads\` (\`id\` varchar(36) NOT NULL, \`enterprise_id\` varchar(100) NOT NULL, \`category_id\` varchar(100) NOT NULL, \`cage_id\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`quantity\` int NOT NULL, \`unit_weight\` decimal(10,2) NOT NULL, \`date\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Deads\` ADD CONSTRAINT \`FK_9b869fda044362f82c38c9ee54e\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Deads\` ADD CONSTRAINT \`FK_9939b5fa139c63bca11da422e0b\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Deads\` DROP FOREIGN KEY \`FK_9939b5fa139c63bca11da422e0b\``);
        await queryRunner.query(`ALTER TABLE \`Deads\` DROP FOREIGN KEY \`FK_9b869fda044362f82c38c9ee54e\``);
        await queryRunner.query(`DROP TABLE \`Deads\``);
    }

}
