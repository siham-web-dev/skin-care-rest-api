import UserRepository from "../adapters/repositories/UserRepository";
import { Role } from "../entities/types/enum";
import User from "../entities/User";

class UserRegistration {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    }
    
  async execute(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: Role,
    email: string,
    phone: string,
  ) {
      
    const user: User = new User(firstName, lastName, username, password, role, email, phone);
    return await this.userRepository.register(user);
  }
}

export default UserRegistration;
