import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import { createConnection } from 'typeorm';

import { apiRouter } from './routes/api.router';
import { config } from './configs/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRouter);

app.listen(config.PORT, async () => {
    console.log('Server has started');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DataBase Connected');
        }
    } catch (e) {
        if (e) console.log(e);
    }
});
