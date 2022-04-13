import { EmailEnum } from '../enums';

export const emailConstant = {
    [EmailEnum.WELCOME]: {
        subject: 'Welcome',
        template: 'welcome',
    },

    [EmailEnum.AUTHORIZED]: {
        subject: 'Authorized',
        template: 'authorization',
    },

    [EmailEnum.UPDATE_ACCOUNT_DATA]: {
        subject: 'You`r account was updated',
        template: 'updateUser',
    },

    [EmailEnum.OLD_EMAIL]: {
        subject: 'You`r account was updated',
        template: 'oldEmail',
    },

    [EmailEnum.ACCOUNT_DELETED]: {
        subject: 'You`r account was deleted',
        template: 'deleteAccount',
    },

    [EmailEnum.ACCOUNT_BLOCKED]: {
        subject: 'You`r account was blocked',
        template: 'Oops you`r account was blocked ',
    },
};
