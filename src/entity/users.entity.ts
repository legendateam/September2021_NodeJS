import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

import { CommonFieldsEntity } from './commonFields.entity';
import { IUsers } from '../interfaces/users.interface';
import { PostsEntity } from './posts.entity';
import { CommentsEntity } from './comments.entity';
import { ActionsEntity } from './actions.entity';

@Entity('Users', { database: 'okten' })
export class UsersEntity extends CommonFieldsEntity implements IUsers {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        age: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        password: string;

    @OneToMany(() => PostsEntity, (posts) => posts.user)
        posts: PostsEntity[];

    @OneToMany(() => CommentsEntity, (comments) => comments.user)
        comments: CommentsEntity[];

    @OneToMany(() => ActionsEntity, (actions) => actions.user)
        actions: ActionsEntity[];
}
