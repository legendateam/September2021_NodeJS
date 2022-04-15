import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableActions1647949805416 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Actions (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                commentId INT NOT NULL,
                userId INT NOT NULL,
                isLike INT,
                isDislike INT,
                FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (commentId) REFERENCES Comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Actions
        `);
    }
}
