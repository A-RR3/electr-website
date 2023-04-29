import { config } from 'dotenv';
config();

const configuration = {
    HOST: process.env.HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default configuration;