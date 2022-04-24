import { joinToRoomRepository } from '../repositories';
import { IJoin } from '../interfaces';

class JoinToRoomService {
    public async join(data: Partial<IJoin>): Promise<IJoin> {
        return joinToRoomRepository.join(data);
    }

    public async checkJoin(data: Partial<IJoin>): Promise<IJoin[]> {
        return joinToRoomRepository.checkJoin(data);
    }
}

export const joinToRoomService = new JoinToRoomService();
