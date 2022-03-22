import { Column, CreateDateColumn } from 'typeorm';
import { ICommonFields } from '../interfaces/commonFields.interface';

export class CommonFieldsEntity implements ICommonFields {
    @Column({
        width: 250,
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createAt: string;

    @Column({
        width: 250,
        nullable: true,
    })
    @CreateDateColumn({ type: 'timestamp' })
        deleteAt?:string;
}
