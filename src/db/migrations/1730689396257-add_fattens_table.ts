import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFattensTable1730689396257 implements MigrationInterface {
    name = 'AddFattensTable1730689396257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Fattens\` (\`id\` varchar(36) NOT NULL, \`origin_cage_id\` varchar(100) NOT NULL, \`destiny_cage_id\` varchar(100) NOT NULL, \`quantity\` int NOT NULL, \`category_id\` varchar(100) NOT NULL, \`description\` varchar(255) NULL, \`date\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Fattens\` ADD CONSTRAINT \`FK_79a09b78ee8340125ca52608241\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Fattens\` ADD CONSTRAINT \`FK_879c5a7d47474fe359f2595b3f1\` FOREIGN KEY (\`origin_cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Fattens\` ADD CONSTRAINT \`FK_a92fe644407cb6fe1cba0805e0e\` FOREIGN KEY (\`destiny_cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Fattens\` DROP FOREIGN KEY \`FK_a92fe644407cb6fe1cba0805e0e\``);
        await queryRunner.query(`ALTER TABLE \`Fattens\` DROP FOREIGN KEY \`FK_879c5a7d47474fe359f2595b3f1\``);
        await queryRunner.query(`ALTER TABLE \`Fattens\` DROP FOREIGN KEY \`FK_79a09b78ee8340125ca52608241\``);
        await queryRunner.query(`DROP TABLE \`Fattens\``);
    }

}
