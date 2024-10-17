import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSalesEventTable1729139402435 implements MigrationInterface {
    name = 'AddSalesEventTable1729139402435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Sales\` (\`created_at\` bigint NOT NULL, \`updated_at\` bigint NOT NULL, \`id\` varchar(36) NOT NULL, \`category_id\` varchar(100) NOT NULL, \`cage_id\` varchar(100) NOT NULL, \`quantity\` int NOT NULL, \`unit_price\` decimal(10,2) NOT NULL, \`unit_weight\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Sales\` ADD CONSTRAINT \`FK_d4a9aecb1cd3c71773581218e41\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Sales\` ADD CONSTRAINT \`FK_c8a4450b5b7653342b16d7d018a\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Sales\` DROP FOREIGN KEY \`FK_c8a4450b5b7653342b16d7d018a\``);
        await queryRunner.query(`ALTER TABLE \`Sales\` DROP FOREIGN KEY \`FK_d4a9aecb1cd3c71773581218e41\``);
        await queryRunner.query(`DROP TABLE \`Sales\``);
    }

}
