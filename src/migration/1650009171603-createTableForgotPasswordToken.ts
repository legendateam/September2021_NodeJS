import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableForgotPasswordToken1650009171603 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS ForgotPasswordToken (
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                userId INT NOT NULL,
                token VARCHAR(255) NOT NULL,
                FOREIGN KEY(userId) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                createAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deleteAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS ForgotPasswordToken
        `);
    }
}
