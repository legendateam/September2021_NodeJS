import cron from 'node-cron';

import { userService } from '../services';

export const getNewUsers = () => {
    cron.schedule('* 59 23 * * *', async () => {
        console.log('START WORK WITH GET NEW USERS');

        const users = await userService.getNewAll();
        console.log(users);
    });
};
