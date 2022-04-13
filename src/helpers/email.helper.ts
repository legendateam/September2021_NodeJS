import Email from 'email-templates';
import path from 'path';
import nodemail from 'nodemailer';

import { config } from '../configs';

const emailTemplate = new Email({
    views: {
        root: path.join(__dirname, '../', 'static'),
        options: {
            extension: 'hbs',
            map: {
                hbs: 'handlebars',
            },
        },
    }
    ,
});

const transport = nodemail.createTransport({
    service: 'gmail',
    auth: {
        user: config.ROOT_EMAIL,
        pass: config.ROOT_EMAIL_PASSWORD,
    },
});

export { emailTemplate, transport };
