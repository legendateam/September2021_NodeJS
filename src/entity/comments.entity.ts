import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFields.entity';
import { IComments } from '../interfaces/comments.interface';
import { UsersEntity } from './users.entity';
import { PostsEntity } from './posts.entity';
import { ActionsEntity } from './actions.entity';
import { config } from '../configs/config';

@Entity('Comments', { database: config.MYSQL_DATABASE_NAME })

export class CommentsEntity extends CommonFieldsEntity implements IComments {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        width: 250,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        authorId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        postId: number;

    @ManyToOne(() => UsersEntity, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user: UsersEntity;

    @ManyToOne(() => PostsEntity, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: PostsEntity;

    @OneToMany(() => ActionsEntity, (actions) => actions.comment)
        actions: ActionsEntity[];
}
