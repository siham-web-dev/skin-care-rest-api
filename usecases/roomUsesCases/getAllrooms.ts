import UserRepository from "../../adapters/repositories/UserRepository";

class GetAllRooms {
  private userRepository: UserRepository;

  constructor(
    userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
  }

  async execute(userId: number) {
    const userRooms = await this.userRepository.getUserRooms(userId); 

    return userRooms
  }
}

export default GetAllRooms;