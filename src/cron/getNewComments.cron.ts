import cron from 'node-cron';

import { commentService } from '../services';

export const getNewComments = () => {
    cron.schedule('59 23 * * *', async () => {
        console.log('START WORK WITH GET NEW COMMENTS FROM POST');

        const comments = await commentService.getNewAll();

        console.log(comments);
    });
};
