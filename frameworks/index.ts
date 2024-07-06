import createServer from "./ServerConfig/server";
import * as dotenv from "dotenv";
import logger from "./ServerConfig/utils/logger";
import dbConnect from "./DBConfig";
import http from "http";
import { Server } from "socket.io";
import MessageRepository from "../adapters/repositories/MessageRepository";
import RoomRepository from "../adapters/repositories/RoomRepository";
import Message from "../entities/Message";
import { SenderType } from "../entities/types/enum";
import run from "./ServerConfig/utils/chatbot";
import { verify_token } from "./ServerConfig/utils/auth";
dotenv.config();

const app = createServer();
const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "*",
        },
    }
);
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

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
    
  socket.on("join_room", async (data) => {
    const { userId } = await verify_token(data.token);
    const db = dbConnect.manager;
    const messageRepository = new MessageRepository(db);
    const messages = await messageRepository.getMessagesOfRoom(
      data.roomId,
      userId
      );
      socket.emit("get_messages_"+data.roomId, messages);
  });

  socket.on("send_message", async (data) => {
    const db = dbConnect.manager;
    const messageRepository = new MessageRepository(db);
    const roomRepository = new RoomRepository(db);

    const room: any = await roomRepository.getBySlug(data.roomId);
    const message = new Message(
      data.content,
      new Date().getTime(),
      SenderType.USER,
      room.id
    );
    await messageRepository.create(message);

    const messageBot = await run(data.content);
    const m = await messageRepository.create({
      content: messageBot,
      sentAt: new Date().getTime(),
      senderType: SenderType.BOT,
      roomId: room.id,
    });

    socket.emit("receive_message_"+data.roomId, { content: messageBot, sentAt: m.sentAt });
  });
});

