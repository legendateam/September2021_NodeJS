import { Column, CreateDateColumn } from 'typeorm';
import { ICommonFields } from '../interfaces/commonFields.interface';

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
    @CreateDateColumn({ type: 'timestamp' })
        deleteAt?:string;
}
