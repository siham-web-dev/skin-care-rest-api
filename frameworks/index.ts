import createServer from "./ServerConfig/server";
import * as dotenv from "dotenv";
import logger from "./ServerConfig/utils/logger";
import dbConnect from "./DBConfig";

const server = createServer();
dotenv.config();

server.listen(process.env.SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
 
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
