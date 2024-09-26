import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascadeDeletionConfig1727323072374 implements MigrationInterface {
    name = 'UpdateCascadeDeletionConfig1727323072374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_6cc01c356da31a286c0fc4750dd\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_5487d2de0219cfcc9408f4b5e46\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_93728ea20ac16dac5d951c2dfd8\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP FOREIGN KEY \`FK_8b670814273f6ab7414041a46cc\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_6cc01c356da31a286c0fc4750dd\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_93728ea20ac16dac5d951c2dfd8\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_5487d2de0219cfcc9408f4b5e46\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD CONSTRAINT \`FK_8b670814273f6ab7414041a46cc\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Cages\` DROP FOREIGN KEY \`FK_8b670814273f6ab7414041a46cc\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_5487d2de0219cfcc9408f4b5e46\``);
        await queryRunner.query(`ALTER TABLE \`Counters\` DROP FOREIGN KEY \`FK_93728ea20ac16dac5d951c2dfd8\``);
        await queryRunner.query(`ALTER TABLE \`Categories\` DROP FOREIGN KEY \`FK_6cc01c356da31a286c0fc4750dd\``);
        await queryRunner.query(`ALTER TABLE \`Cages\` ADD CONSTRAINT \`FK_8b670814273f6ab7414041a46cc\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_93728ea20ac16dac5d951c2dfd8\` FOREIGN KEY (\`cage_id\`) REFERENCES \`Cages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Counters\` ADD CONSTRAINT \`FK_5487d2de0219cfcc9408f4b5e46\` FOREIGN KEY (\`category_id\`) REFERENCES \`Categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Categories\` ADD CONSTRAINT \`FK_6cc01c356da31a286c0fc4750dd\` FOREIGN KEY (\`enterprise_id\`) REFERENCES \`Enterprises\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
