import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHealthsTable1730781477435 implements MigrationInterface {
    name = 'AddHealthsTable1730781477435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Healths\` (\`id\` varchar(36) NOT NULL, \`enterprise_id\` varchar(100) NOT NULL, \`category_id\` varchar(100) NOT NULL, \`cage_id\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`quantity\` int NOT NULL, \`date\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Healths\` ADD CONSTRAINT \`FK_22e034e134955576b10130aa5fb\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Healths\` ADD CONSTRAINT \`FK_b8fc49cf879bd383a2159743295\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Healths\` DROP FOREIGN KEY \`FK_b8fc49cf879bd383a2159743295\``);
        await queryRunner.query(`ALTER TABLE \`Healths\` DROP FOREIGN KEY \`FK_22e034e134955576b10130aa5fb\``);
        await queryRunner.query(`DROP TABLE \`Healths\``);
    }

}
