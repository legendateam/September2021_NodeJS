import { chatRepository } from '../repositories';
import { IChat } from '../interfaces';

class ChatService {
    public async saveMessage(message: IChat) {
        const save = await chatRepository.saveMessage(message);
        return save;
    }

    public async getMessages({ roomId }: Partial<IChat>): Promise<IChat[]> {
        return chatRepository.getMessages({ roomId });
    }
}

export const chatService = new ChatService();
