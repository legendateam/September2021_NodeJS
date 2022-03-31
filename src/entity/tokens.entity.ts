import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { config } from '../configs/config';
import { CommonFieldsEntity } from './commonFields.entity';
import { UsersEntity } from './users.entity';
import { IToken } from '../interfaces/token.interface';

@Entity('Tokens', { database: config.MYSQL_DATABASE_NAME })

export class TokensEntity extends CommonFieldsEntity implements IToken {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => UsersEntity)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;
}
