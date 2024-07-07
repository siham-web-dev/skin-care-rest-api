import RoomRepository from "../../adapters/repositories/RoomRepository";

class DeleteRoom {
  private roomRepository: RoomRepository;

  constructor(
    roomRepository: RoomRepository,
  ) {
    this.roomRepository = roomRepository;
  }

  async execute(slug: string) {
    const room = await this.roomRepository.delete(slug); 

    return room
  }
}

export default DeleteRoom