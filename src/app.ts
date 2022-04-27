import express from 'express';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import path from 'path';
import { createConnection } from 'typeorm';
import { Server } from 'socket.io';
import { App } from 'uWebSockets.js';

import { apiRouter } from './routes';
import { config } from './configs';
import { cronNode } from './cron';
import { socketController } from './controllers';

const app = express();

// @ts-ignore
const app2 = new App();
const io = new Server();

io.attachApp(app2, { cors: { origin: '*' } });

app.use(fileUpload());

mongoose.connect(`mongodb://localhost:${config.PORT_MONGO}/${config.MONGODB_DATABASE_NAME}`);

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

io.on('connection', (socket) => socketController.connection(io, socket));

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
