import { Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

import { ICommonFields } from '../interfaces';

export class CommonFieldsEntity implements ICommonFields {
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
