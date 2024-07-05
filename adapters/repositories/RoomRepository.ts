import { EntityManager } from "typeorm";
import { Repository } from "./Repository";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import RoomModel from "../../frameworks/DBConfig/models/RoomModel";
import dotenv from "dotenv";
import Room from "../../entities/room";

dotenv.config();

class RoomRepository extends Repository {
  constructor(db: EntityManager) {
    super(db);
  }

  async getBySlug(slug: string): Promise<RoomModel | null> {
    const room = await this.db.findOne(RoomModel, {
      where: { slug },
    });

    if (!room) {
      throw new AppError("Room not found", 404);
    }

    return room;
    }
    
    async create(room: Room): Promise<RoomModel> {
        const newRoom = this.db.create(RoomModel, room);
        const createdRoom = await this.db.save(newRoom);
        const { title } = createdRoom;
        
        const t = title.replace(/\s+/g, '-').toLowerCase();
        createdRoom.slug = t;

        return await this.db.save(RoomModel, createdRoom);
    }
}

export default RoomRepository;
