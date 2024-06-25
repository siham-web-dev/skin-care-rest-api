import dbConnect from "../../frameworks/DBConfig";
import UserRegistration from "../../usecases/userUseCases/userRegistration";
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserAuthentication from "../../usecases/userUseCases/userAuthentication";
import SessionRepository from "../repositories/SessionRepository";

class UserController {
    
  async login(req: Request, res: Response): Promise<void> {
    const { usernameOrEmailOrPhone, password } = req.body;
    const db = dbConnect.manager;
    const userRepository = new UserRepository(db);
    const sessionRepository = new SessionRepository(db);
    const loginUseCase = new UserAuthentication(userRepository, sessionRepository);
    const token = await loginUseCase.execute(usernameOrEmailOrPhone, password);
    
    res.status(201).send({ token, message: "login success" });
  }

  async register(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, username, password, role, email, phone } =
      req.body;
    const db = dbConnect.manager;
    const userRepository = new UserRepository(db);
    const registerUseCase = new UserRegistration(userRepository);
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
  }

  async logout(req: Request, res: Response): Promise<void> {
    
    res.status(201).send({ message: "logout success" });
  }
}

export default UserController;
