import dbConnect from "../../frameworks/DBConfig";
import UserRegistration from "../../usecases/userRegistration";
import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

  class  UserController {
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
}

export default UserController;
