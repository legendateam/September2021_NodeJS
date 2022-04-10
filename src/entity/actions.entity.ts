import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { IAction } from '../interfaces';
import { config } from '../configs';
import { CommonFieldsEntity } from './commonFields.entity';
import { UsersEntity } from './users.entity';
import { CommentsEntity } from './comments.entity';

@Entity('Actions', { database: config.MYSQL_DATABASE_NAME })

export class ActionsEntity extends CommonFieldsEntity implements IAction {
    @Column({
        type: 'int',
        nullable: false,
    })
        commentId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'int',
        nullable: true,
    })
        isLike: number;

    @Column({
        type: 'int',
        nullable: true,
    })
        isDislike: number;

    @ManyToOne(() => UsersEntity, (user) => user.actions)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;

    @ManyToOne(() => CommentsEntity, (comment) => comment.actions)
    @JoinColumn({ name: 'commentId' })
        comment: CommentsEntity;
}
