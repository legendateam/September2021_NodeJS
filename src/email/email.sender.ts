import nodemail from 'nodemailer';

import { EmailEnum } from '../enums';
import { config } from '../configs';
import { emailConstant } from '../constants';

class EmailSender {
    public async sendEmail(email: string, type: EmailEnum) {
        const { subject, text } = emailConstant[type];

        const transport = nodemail.createTransport({
            service: 'gmail',
            auth: {
                user: config.ROOT_EMAIL,
                pass: config.ROOT_EMAIL_PASSWORD,
            },
        });

        await transport.sendMail({
            from: 'NodeJs',
            to: email,
            subject,
            text,
        });
    }
}

export const emailSender = new EmailSender();
