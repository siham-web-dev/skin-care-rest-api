import dbConnect from "../../frameworks/DBConfig";
import UserRegistration from "../../usecases/userUseCases/userRegistration";
import UserRepository from "../repositories/UserRepository";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserAuthentication from "../../usecases/userUseCases/userAuthentication";
import SessionRepository from "../repositories/SessionRepository";
import UserSignOut from "../../usecases/userUseCases/userSignout";

class UserController {
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;
  constructor() {
    const db = dbConnect.manager;
    this.userRepository = new UserRepository(db);
    this.sessionRepository = new SessionRepository(db);
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usernameOrEmailOrPhoneNumber, password } = req.body;
      const loginUseCase = new UserAuthentication(
        this.userRepository,
        this.sessionRepository
      );
      const token = await loginUseCase.execute(
        usernameOrEmailOrPhoneNumber,
        password
      );

      res.status(201).send({ token, message: "login success" });
    } catch (error) {
      next(error);
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { firstName, lastName, username, password, role, email, phone } =
        req.body;

      const registerUseCase = new UserRegistration(this.userRepository);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await registerUseCase.execute(
        firstName,
        lastName,
        username,
        hashedPassword,
        role,
        email,
        phone
      );

      res.status(201).send({
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const { session_id } = req.sessionInfo;
      const signOutUseCase = new UserSignOut(this.sessionRepository);
      await signOutUseCase.execute(session_id);
      res.status(201).send({ message: "logout success" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
