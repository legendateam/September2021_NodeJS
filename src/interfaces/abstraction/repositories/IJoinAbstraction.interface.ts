import { IJoin } from '../../join.interface';

export interface IJoinAbstraction {
    join(data: Partial<IJoin>): Promise<IJoin>,
    checkJoin({ roomId }: Partial<IJoin>): Promise<IJoin[]>
}
