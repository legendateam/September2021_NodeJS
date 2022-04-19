import express from 'express';
import { engine } from 'express-handlebars';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import path from 'path';

import { apiRouter } from './routes';
import { config } from './configs';
import { cronNode } from './cron';

const app = express();

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
