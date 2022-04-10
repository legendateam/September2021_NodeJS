import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnNameInActions1649620163774 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Actions RENAME COLUMN _dislike TO isDisLike
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Actions RENAME COLUMN isDisLike TO _dislike
        `);
    }
}
