import dotenv from 'dotenv';
dotenv.config();

export const HOST_URI = process.env.WEB_SERVER_HOST + ':' + process.env.WEB_SERVER_PORT