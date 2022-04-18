import cron from 'node-cron';

import { postService } from '../services';

export const getNewPosts = () => {
    cron.schedule('59 23 * * *', async () => {
        console.log('START WORK WITH GET NEW POSTS');

        const posts = await postService.getNewAll();
        console.log(posts);
    });
};
