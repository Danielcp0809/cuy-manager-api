import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetPasswordCodeAndDate1728607537480 implements MigrationInterface {
    name = 'AddResetPasswordCodeAndDate1728607537480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`reset_password_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Credentials\` ADD \`reset_password_date\` bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`reset_password_date\``);
        await queryRunner.query(`ALTER TABLE \`Credentials\` DROP COLUMN \`reset_password_code\``);
    }

}
