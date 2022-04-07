import {
    Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { IAction } from '../interfaces';
import { config } from '../configs';
import { CommonFieldsEntity } from './commonFields.entity';
import { UsersEntity } from './users.entity';
import { CommentsEntity } from './comments.entity';

@Entity('Actions', { database: config.MYSQL_DATABASE_NAME })

export class ActionsEntity extends CommonFieldsEntity implements IAction {
    @PrimaryGeneratedColumn()
        id: number;

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
        _like: number;

    @Column({
        type: 'int',
        nullable: true,
    })
        _dislike: number;

    @ManyToOne(() => UsersEntity, (user) => user.actions)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;

    @ManyToOne(() => CommentsEntity, (comment) => comment.actions)
    @JoinColumn({ name: 'commentId' })
        comment: CommentsEntity;
}
