import { EntityRepository, getManager, Repository } from 'typeorm';

import { JoinRoomEntity } from '../../entity';
import { IJoin, IJoinAbstraction } from '../../interfaces';

@EntityRepository(JoinRoomEntity)

class JoinToRoomRepository extends Repository<JoinRoomEntity> implements IJoinAbstraction {
    public async join(data: Partial<IJoin>): Promise<IJoin> {
        return getManager()
            .getRepository(JoinRoomEntity)
            .save(data);
    }

    public async checkJoin({ roomId }: Partial<IJoin>): Promise<IJoin[]> {
        return getManager()
            .getRepository(JoinRoomEntity)
            .find({
                where: roomId,
            });
    }
}

export const joinToRoomRepository = new JoinToRoomRepository();
