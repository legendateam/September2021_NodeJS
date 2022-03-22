import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1647949747663 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL,
                age INT CHECK (age > 0 AND age < 200) NOT NULL,
                phone VARCHAR(250) UNIQUE NOT NULL,
                email VARCHAR(250) UNIQUE NOT NULL,
                password VARCHAR(250) NOT NULL,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            ) 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
    }
}
