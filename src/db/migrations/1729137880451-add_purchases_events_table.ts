import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPurchasesEventsTable1729137880451 implements MigrationInterface {
    name = 'AddPurchasesEventsTable1729137880451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_f77f303e918a147dadb58dba9e0\``);
        await queryRunner.query(`CREATE TABLE \`Purchases\` (\`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, \`id\` varchar(36) NOT NULL, \`category_id\` varchar(100) NOT NULL, \`enterprise_id\` varchar(100) NOT NULL, \`cage_id\` varchar(100) NOT NULL, \`quantity\` int NOT NULL, \`weight\` decimal(10,2) NOT NULL, \`total_price\` decimal(10,2) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_f77f303e918a147dadb58dba9e0\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Purchases\` ADD CONSTRAINT \`FK_b76f7385444db552bf53e5eafcd\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Purchases\` ADD CONSTRAINT \`FK_73e90ebe087857f0c2e040f9089\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Purchases\` DROP FOREIGN KEY \`FK_73e90ebe087857f0c2e040f9089\``);
        await queryRunner.query(`ALTER TABLE \`Purchases\` DROP FOREIGN KEY \`FK_b76f7385444db552bf53e5eafcd\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` DROP FOREIGN KEY \`FK_f77f303e918a147dadb58dba9e0\``);
        await queryRunner.query(`DROP TABLE \`Purchases\``);
        await queryRunner.query(`ALTER TABLE \`Breedings\` ADD CONSTRAINT \`FK_f77f303e918a147dadb58dba9e0\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
