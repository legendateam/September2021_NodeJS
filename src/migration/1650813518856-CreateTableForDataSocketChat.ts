import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableForDataSocketChat1650813518856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Chat (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                accessToken VARCHAR(255) NOT NULL,
                userId VARCHAR(255) NOT NULL,
                authorName VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                roomId VARCHAR(255) NOT NULL,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Chat
        `);
    }
}
