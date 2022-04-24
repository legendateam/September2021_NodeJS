import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableJoin1650827445652 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           CREATE TABLE IF NOT EXISTS JoinRoom (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                roomId VARCHAR(255) NOT NULL,
                userId VARCHAR(255) NOT NULL,
                accessToken VARCHAR(255) NOT NULL,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Join
        `);
    }
}
