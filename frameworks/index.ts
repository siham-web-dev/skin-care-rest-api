import createServer from "./ServerConfig/server";
import * as dotenv from 'dotenv'
import logger from "./ServerConfig/utils/logger";

const server = createServer()
dotenv.config()

server.listen(process.env.SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.SERVER_PORT}`)
})