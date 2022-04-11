import { EmailEnum } from '../enums';

export const emailConstant = {
    [EmailEnum.WELCOME]: {
        subject: 'Welcome',
        text: 'Welcome',
    },

    [EmailEnum.LOGIN]: {
        subject: 'Login',
        text: 'Login',
    },

    [EmailEnum.BLOCK]: {
        subject: 'You`r account was blocked',
        text: 'Oops you`r account was blocked ',
    },

};
