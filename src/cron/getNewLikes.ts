import cron from 'node-cron';

import { actionService } from '../services';

export const getNewLikes = () => {
    cron.schedule('10 58 23 * * *', async () => {
        console.log('START WORK WITH GET NEW Likes');
        const likes = await actionService.getNewAll();
        console.log(likes);
    });
};
