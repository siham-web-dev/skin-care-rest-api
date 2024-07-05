import createServer from "./ServerConfig/server";
import * as dotenv from "dotenv";
import logger from "./ServerConfig/utils/logger";
import dbConnect from "./DBConfig";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = createServer();
const server = http.createServer(app);
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`)
})

server.listen(process.env.WEB_SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.WEB_SERVER_PORT}`);
 
    dbConnect
    .initialize()
    .then(() => {
        logger.info(`DB Server is running now`);
    })
    .catch((error) => { 
        logger.error("There was an error connecting to the database: ");
        logger.error(error);
    });
});
