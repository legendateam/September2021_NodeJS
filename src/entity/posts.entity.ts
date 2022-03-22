import {
    PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFields.entity';
import { IPosts } from '../interfaces/posts.interface';
import { UsersEntity } from './users.entity';
import { CommentsEntity } from './comments.entity';

@Entity('Posts', { database: 'okten' })

export class PostsEntity extends CommonFieldsEntity implements IPosts {
    @PrimaryGeneratedColumn()
        id: number;

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
