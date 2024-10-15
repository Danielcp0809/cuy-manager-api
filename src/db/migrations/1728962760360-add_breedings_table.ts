import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBreedingsTable1728962760360 implements MigrationInterface {
    name = 'AddBreedingsTable1728962760360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Breedings\` (\`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, \`id\` varchar(36) NOT NULL, \`cage_id\` varchar(100) NOT NULL, \`male_cage_id\` varchar(100) NOT NULL, \`male_category_id\` varchar(100) NOT NULL, \`male_quantity\` int NOT NULL, \`female_cage_id\` varchar(100) NOT NULL, \`female_category_id\` varchar(100) NOT NULL, \`female_quantity\` int NOT NULL, \`continuous_breeding\` tinyint(1) NOT NULL DEFAULT 0, \`description\` varchar(255) NOT NULL, \`enterprise_id\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_f77f303e918a147dadb58dba9e0\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_d55b498517b69e33235d21d18d6\` FOREIGN KEY (\`male_cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_406e50a2b9916a8afbca0d1516a\` FOREIGN KEY (\`male_category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_b277687273f05ed9555d72d9459\` FOREIGN KEY (\`female_cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_2c5cbb03ab41f53905e15482a9b\` FOREIGN KEY (\`female_category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_2c5cbb03ab41f53905e15482a9b\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_b277687273f05ed9555d72d9459\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_406e50a2b9916a8afbca0d1516a\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_d55b498517b69e33235d21d18d6\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_f77f303e918a147dadb58dba9e0\``);
        await queryRunner.query(`DROP TABLE \`Breedings\``);
    }

}
