import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

import { ICommonFields } from '../interfaces';

export class CommonFieldsEntity implements ICommonFields {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createAt: string;

    @Column({
        nullable: true,
    })
    @DeleteDateColumn({ type: 'timestamp' })
        deleteAt?:string;
}
