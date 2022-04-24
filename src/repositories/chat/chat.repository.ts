import { EntityRepository, getManager, Repository } from 'typeorm';

import { ChatEntity } from '../../entity';
import { IChat, IChatAbstraction } from '../../interfaces';

@EntityRepository(ChatEntity)

class ChatRepository extends Repository<ChatEntity> implements IChatAbstraction {
    public async saveMessage(message: IChat): Promise<IChat> {
        const save = await getManager()
            .getRepository(ChatEntity)
            .save(message);
        return save;
    }

    public async getMessages({ roomId }: Partial<IChat>): Promise<IChat[]> {
        return getManager()
            .getRepository(ChatEntity)
            .createQueryBuilder('chat')
            .where('chat.roomId = :roomId', { roomId })
            .getMany();
    }
}

export const chatRepository = new ChatRepository();
