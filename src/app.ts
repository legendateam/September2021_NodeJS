import express from 'express';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import http from 'http';
import { createConnection } from 'typeorm';
import path from 'path';
import SocketIO from 'socket.io';

import { apiRouter } from './routes';
import { config } from './configs';
import { cronNode } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

io.on('connection', (socket: any) => {
    console.log(socket.handshake.query.userId);
    console.log(socket.handshake.query.accessToken);

    socket.on('Test', (data: any) => {
        console.log({ message: data.message });

        // One to One
        socket.emit('Test2', { message: 'OK' });
    });

    // SEND TO ALL ONLINE USERS (INCLUDE SENDER)
    io.emit('Test3', { message: 'hello world again dude' });

    // SEND TO ALL ONLINE USERS (AVOID SENDER)
    socket.broadcast.emit('Alert', { message: 'Technical works' });

    socket.on('Join', (data: any) => {
        socket.join(data.room);

        // all message in the room AVOID sender
        socket.broadcast.to(data.room).emit('joined', ({ message: `${data.name} Joined to room ${data.room}` }));

        // all message in the room include sender
        io.to(data.room).emit('welcome', { message: 'welcome' });
    });
});

app.use(apiRouter);

server.listen(config.PORT, async () => {
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
