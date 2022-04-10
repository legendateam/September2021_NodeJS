import {
    Entity, Column, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFields.entity';
import { IPost } from '../interfaces';
import { UsersEntity } from './users.entity';
import { CommentsEntity } from './comments.entity';
import { config } from '../configs';

@Entity('Posts', { database: config.MYSQL_DATABASE_NAME })

export class PostsEntity extends CommonFieldsEntity implements IPost {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => UsersEntity, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: UsersEntity;

    @OneToMany(() => CommentsEntity, (comments) => comments.post)
        comments: CommentsEntity[];
}
