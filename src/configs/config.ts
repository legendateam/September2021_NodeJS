import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    PORT_MONGO: process.env.PORT_MONGO || 27017,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || 'Harvard University',
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME,
    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,
    HOST_DATABASE: process.env.HOST_DATABASE || 'localhost',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY,
    SECRET_FORGOT_PASSWORD_KEY: process.env.SECRET_FORGOT_PASSWORD_KEY,
    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    EXPIRES_IN_FORGOT_PASSWORD: process.env.EXPIRES_IN_FORGOT_PASSWORD,
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD,
    DOMAIN_NAME: process.env.DOMAIN_NAME || 'https://owu.com.ua/',
    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
};
