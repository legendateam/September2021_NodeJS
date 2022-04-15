import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    SECRET_FORGOT_PASSWORD_KEY: process.env.SECRET_FORGOT_PASSWORD_KEY,
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    EXPIRES_IN_FORGOT_PASSWORD: process.env.EXPIRES_IN_FORGOT_PASSWORD,
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
};
