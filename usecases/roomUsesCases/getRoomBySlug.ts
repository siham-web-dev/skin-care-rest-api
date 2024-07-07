import RoomRepository from "../../adapters/repositories/RoomRepository";

class GetRoomBySlug {
  private roomRepository: RoomRepository;

  constructor(
    roomRepository: RoomRepository,
  ) {
    this.roomRepository = roomRepository;
  }

  async execute(slug: string) {
    const room = await this.roomRepository.getBySlug(slug); 

    return room
  }
}

export default GetRoomBySlug
