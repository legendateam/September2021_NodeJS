import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { config } from '../configs';
import { CommonFieldsEntity } from './commonFields.entity';
import { UsersEntity } from './users.entity';
import { IForgotPasswordEntity } from '../interfaces';

@Entity('forgotPasswordToken', { database: config.MYSQL_DATABASE_NAME })

export class ForgotPasswordEntity extends CommonFieldsEntity implements IForgotPasswordEntity {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        token: string;

    @OneToOne(() => UsersEntity)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;
}
