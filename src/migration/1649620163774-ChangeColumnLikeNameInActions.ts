import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnDisLikeNameInActions1649620163774 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Actions RENAME COLUMN _like TO isLike
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE Actions RENAME COLUMN isLike TO _like
        `);
    }
}
