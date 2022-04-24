import { IChat } from '../../chat.interface';

export interface IChatAbstraction {
    saveMessage(message: Partial<IChat>): Promise<IChat>,
    getMessages({ roomId }: Partial<IChat>): Promise<IChat[]>
}
