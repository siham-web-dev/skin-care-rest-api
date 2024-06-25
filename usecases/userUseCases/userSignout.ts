import SessionRepository from "../../adapters/repositories/SessionRepository";
import AppError from "../../frameworks/ServerConfig/utils/appError";

class UserSignOut {
  private sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }
    
  async execute(session_id: number) {

    const session = await this.sessionRepository.findSessionById(session_id);
    if (!session) {
      throw new AppError("Session not found", 401);
    }

    if (!session.is_active) {
      throw new AppError("Session already desactivated", 400);
    }

    try {
      session.is_active = false;
      await this.sessionRepository.desactivateSession(session_id);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default UserSignOut;


