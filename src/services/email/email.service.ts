import { EmailEnum } from '../../enums';
import { emailConstant } from '../../constants';
import { emailTemplate, transport } from '../../helpers';
import { config } from '../../configs';

class EmailService {
    public async sendEmail(email: string, type: EmailEnum, context: object): Promise<void> {
        const { subject, template } = emailConstant[type];

        Object.assign(context, { domainName: config.DOMAIN_NAME });

        const html = await emailTemplate.render(template, { context });

        await transport.sendMail({
            from: 'NodeJS <no-reply@nodejs.com.ua>',
            to: email,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
