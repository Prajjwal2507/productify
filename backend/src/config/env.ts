import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const ENV = {
    PORT: process.env.PORT || 3002,
    NODE_ENV: process.env.NODE_ENV ,
    DATABASE_URL: process.env.DATABASE_URL ,
    JWT_SECRET: process.env.JWT_SECRET ,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};
