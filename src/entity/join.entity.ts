import { Column, Entity } from 'typeorm';

import { config } from '../configs';
import { CommonFieldsEntity } from './commonFields.entity';
import { IJoin } from '../interfaces';

@Entity('JoinRoom', { database: config.MYSQL_DATABASE_NAME })

export class JoinRoomEntity extends CommonFieldsEntity implements IJoin {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        roomId: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        userId: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;
}
