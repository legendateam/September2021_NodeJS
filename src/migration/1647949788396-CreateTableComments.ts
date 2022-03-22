import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1647949788396 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                text VARCHAR(250) NOT NULL,
                authorId INT NOT NULL,
                postId INT NOT NULL,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Comments
        `);
    }
}
