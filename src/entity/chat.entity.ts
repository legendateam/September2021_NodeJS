import { Column, Entity } from 'typeorm';

import { config } from '../configs';
import { CommonFieldsEntity } from './commonFields.entity';
import { IChat } from '../interfaces';

@Entity('Chat', { database: config.MYSQL_DATABASE_NAME })

export class ChatEntity extends CommonFieldsEntity implements IChat {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        authorName:string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        userId: string;

    @Column({
        type: 'text',
        nullable: false,
    })
        message: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        roomId: string;
}
