import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePosts1647949771134 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Posts (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                title VARCHAR(250) NOT NULL,
                text VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()),
                deleteAt TIMESTAMP 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Posts
        `);
    }
}
