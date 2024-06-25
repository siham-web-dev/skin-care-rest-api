import SessionRepository from "../../adapters/repositories/SessionRepository";
import UserRepository from "../../adapters/repositories/UserRepository";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import { generate_token, verifyPassword } from "../../frameworks/ServerConfig/utils/auth";

class UserSignOut {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;

  constructor(userRepository: UserRepository, sessionRepository: SessionRepository) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }
    
  async execute(token: string) {
   
  }
}

export default UserSignOut;


