import express from 'express';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import path from 'path';
import { App } from 'uWebSockets.js';
import { Server } from 'socket.io';
// eslint-disable-next-line import/no-extraneous-dependencies
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

import { apiRouter } from './routes';
import { config } from './configs';
import { cronNode } from './cron';
import { chatService, joinToRoomService } from './services';
import { ICreateMessage, IRoomJoin, IRoomReload } from './interfaces';
// import { chatService } from './services';

const app = express();

// @ts-ignore
const app2 = new App();
const io = new Server();

io.attachApp(app2, { cors: { origin: '*' } });

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

app.listen(config.PORT, async () => {
    console.log(`Server has started on PORT:${config.PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DataBase Connected');
            cronNode();
        }
    } catch (e) {
        if (e) console.log(e);
    }
});

io.on('connection', (socket) => {
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

        socket.on('message-create', async ({ message }: ICreateMessage) => {

            await chatService.saveMessage({
                userId, message, authorName, roomId, accessToken,
            });

            io.to(roomId).emit('message-created', {
                userId, message, authorName, roomId, accessToken,
            });
        });
        // }
    });

    socket.on('room-reload', async ({ roomId } : IRoomReload) => {
        const messages = await chatService.getMessages({ roomId });
        socket.emit('message-getFromDB', messages);
    });
});

app2.listen(5000, (token: any) => {
    try {
        console.log(`Server has started on PORT:${5000}`);
        if (!token) {
            console.warn('port already in use');
        }
    } catch (e) {
        console.warn(e);
    }
});
