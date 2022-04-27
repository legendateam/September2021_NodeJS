// eslint-disable-next-line import/no-extraneous-dependencies
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

import { chatService, joinToRoomService } from '../services';
import { ICreateMessage, IRoomJoin, IRoomReload } from '../interfaces';

class SocketController {
    public async connection(io: any, socket: any) {
        console.log(socket.id, 'socket__id');
        console.log(socket.handshake.query.userId, 'uuid__emit_userId');

        const accessToken = socket.id;
        const userId = socket.handshake.query?.userId as string;

        const config: Config = { dictionaries: [names] };

        const authorName = uniqueNamesGenerator(config); // Winona

        socket.on('room-join', async ({ roomId, id } : IRoomJoin) => {
            await joinToRoomService.join({ roomId, userId: id, accessToken });
            socket.join(roomId);

            socket.broadcast.to(roomId).emit('room-joined', { message: `${authorName} has joined room ${roomId}` });

            socket.emit('room-getMessages-after-reloading-page', { roomId });

            socket.on('message-create', async ({ message }: ICreateMessage) => this._messageCreate(io, {
                userId,
                message,
                authorName,
                roomId,
                accessToken,
            }));
        });

        socket.on('room-reload', ({ roomId } : IRoomReload) => this._roomReload(socket, { roomId }));
    }

    private async _roomReload(socket: any, { roomId } : IRoomReload) {
        const messages = await chatService.getMessages({ roomId });
        socket.emit('message-getFromDB', messages);
    }

    private async _messageCreate(io: any, {
        userId, message, authorName, roomId, accessToken,
    }: ICreateMessage) {
        await chatService.saveMessage({
            userId, message, authorName, roomId, accessToken,
        });

        io.to(roomId).emit('message-created', {
            userId, message, authorName, roomId, accessToken,
        });
    }
}

export const socketController = new SocketController();
