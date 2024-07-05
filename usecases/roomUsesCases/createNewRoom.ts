import RoomRepository from "../../adapters/repositories/RoomRepository";
import Room from "../../entities/room";
import RoomModel from "../../frameworks/DBConfig/models/RoomModel";

class CreateRoom {
  private roomRepository: RoomRepository;

  constructor(
    roomRepository: RoomRepository,
  ) {
    this.roomRepository = roomRepository;
  }

  async execute(roomDto: Room): Promise<RoomModel> {
    const room = await this.roomRepository.create(roomDto); 

    return room
  }
}

export default CreateRoom