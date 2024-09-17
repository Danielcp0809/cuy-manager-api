import { MigrationInterface, QueryRunner } from "typeorm";

export class CredentialsTableWithRelations1726551141064 implements MigrationInterface {
    name = 'CredentialsTableWithRelations1726551141064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Credentials\` (\`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`reset_password\` tinyint(1) NOT NULL DEFAULT 1, \`enterprise_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_9af080798f9c9ddb6dd5054f80\` (\`username\`), UNIQUE INDEX \`IDX_8fd5db8b81fbafa6c80b4b6b25\` (\`password\`), UNIQUE INDEX \`REL_fc41d59511c7e58a5fc4fdabe3\` (\`enterprise_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD CONSTRAINT \`FK_fc41d59511c7e58a5fc4fdabe36\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP FOREIGN KEY \`FK_fc41d59511c7e58a5fc4fdabe36\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`Enterprises\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`DROP INDEX \`REL_fc41d59511c7e58a5fc4fdabe3\` ON \`Credentials\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fd5db8b81fbafa6c80b4b6b25\` ON \`Credentials\``);
        await queryRunner.query(`DROP INDEX \`IDX_9af080798f9c9ddb6dd5054f80\` ON \`Credentials\``);
        await queryRunner.query(`DROP TABLE \`Credentials\``);
    }

}
