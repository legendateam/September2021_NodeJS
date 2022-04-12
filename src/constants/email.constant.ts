import { EmailEnum } from '../enums';

export const emailConstant = {
    [EmailEnum.WELCOME]: {
        subject: 'Welcome',
        text: 'Welcome',
    },

    [EmailEnum.AUTHORIZED]: {
        subject: 'Authorized',
        text: 'email.login',
    },

    [EmailEnum.UPDATE_ACCOUNT_DATA]: {
        subject: 'You`r account was updated',
        text: 'Congratulation your account data has been successfully updated',
    },

    [EmailEnum.ACCOUNT_DELETED]: {
        subject: 'You`r account was deleted',
        text: 'You`r account was deleted',
    },

    [EmailEnum.ACCOUNT_BLOCKED]: {
        subject: 'You`r account was blocked',
        text: 'Oops you`r account was blocked ',
    },
};
