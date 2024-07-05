import dbConnect from "../../frameworks/DBConfig";
import { NextFunction, Request, Response } from "express";
import RoomRepository from "../repositories/RoomRepository";
import GetAllRooms from "../../usecases/roomUsesCases/getAllrooms";
import UserRepository from "../repositories/UserRepository";
import GetRoomBySlug from "../../usecases/roomUsesCases/getRoomBySlug";
import CreateRoom from "../../usecases/roomUsesCases/createNewRoom";

class RoomController {
    private roomRepository: RoomRepository
    private userRepository: UserRepository
   constructor() {
      const db = dbConnect.manager;
      this.roomRepository = new RoomRepository(db);
      this.userRepository = new UserRepository(db);
    }
    
  async getBySlug(req: any, res: Response, next: NextFunction): Promise<void> {
      const { slug } = req.params;

      try {
          const GetRoomBySlugUseCase = new GetRoomBySlug(this.roomRepository);
          const room = await GetRoomBySlugUseCase.execute(slug);
          res.status(200).send(room);
      } catch (error) {
          next(error);
      }
  }

  async getAll(req: any, res: Response, next: NextFunction): Promise<void> {
    const userId = req.sessionInfo.userId;
    
    try {
        const GetAllRoomsUseCase = new GetAllRooms(this.userRepository);
        const rooms = await GetAllRoomsUseCase.execute(userId);
        res.status(200).send(rooms);
    } catch (error) {
        next(error);
    }   
  }

  async add(req: any, res: Response, next: NextFunction): Promise<void> {
      try {
          const { userId } = req.sessionInfo;
          const { title } = req.body;
          const addRoomUseCase = new CreateRoom(this.roomRepository);
          const room = await addRoomUseCase.execute({ title, userId });
          res.status(200).send(room);
      }
      catch (error) {
          next(error);
      }
  }

  async delete(req: any, res: Response, next: NextFunction): Promise<void> {}
}

export default RoomController;
