import { getNewUsers } from './getNewUsers.cron';
import { getNewPosts } from './getNewPosts.cron';
import { getNewComments } from './getNewComments.cron';
import { getNewLikes } from './getNewLikes';

export const cronNode = () => {
    console.log('CRONS HAS STARTED');
    getNewUsers();
    getNewPosts();
    getNewComments();
    getNewLikes();
};
