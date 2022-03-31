import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { config } from '../configs/config';
import { CommonFieldsEntity } from './commonFields.entity';
import { UsersEntity } from './users.entity';
import { IRole } from '../interfaces/role.inreface';

@Entity('Role', { database: config.MYSQL_DATABASE_NAME })

export class RoleEntity extends CommonFieldsEntity implements IRole {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 10,
        default: 'user',
        nullable: false,
    })
        role:string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @OneToOne(() => UsersEntity)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;
}
