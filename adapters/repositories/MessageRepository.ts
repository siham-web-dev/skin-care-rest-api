import { EntityManager } from "typeorm";
import { Repository } from "./Repository";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import RoomModel from "../../frameworks/DBConfig/models/RoomModel";
import dotenv from "dotenv";
import Room from "../../entities/room";
import MessageModel from "../../frameworks/DBConfig/models/MessageModel";
import Message from "../../entities/Message";

dotenv.config();

class MessageRepository extends Repository {
  constructor(db: EntityManager) {
    super(db);
  }

  async getMessagesOfRoom(slug: string, userId: number): Promise<MessageModel[] | null> {
    const room = await this.db.findOne(RoomModel, {
        where: { slug },
        relations:["messages", "user"]
    });

    if (!room) {
      throw new AppError("Room not found", 404);
    }
      
    if (room.user.id !== userId) {
        throw new AppError("You are not authorized to access this room", 401);
    } 

    return room.messages.sort((a, b) => a.sentAt - b.sentAt);
  }
  
  async create(message: Message): Promise<MessageModel> {
      const newMessage = this.db.create(MessageModel, {
          ...message,
          room: {
              id: message.roomId
          }
    });
    return await this.db.save(newMessage);
  }
}

export default MessageRepository;
