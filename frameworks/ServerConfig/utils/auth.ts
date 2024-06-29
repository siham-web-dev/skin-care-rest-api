import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request } from "express";
import AppError from "./appError";
import SessionRepository from "../../../adapters/repositories/SessionRepository";
import dbConnect from "../../DBConfig";
dotenv.config();

type JWTPayload = {
  session_id: number;
  username: string;
  userId?: number;
};

export function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export async function generate_token({ session_id, username }: JWTPayload) {
  const SECERET_KEY = process.env.JWT_TOKEN as string;
  return await jwt.sign({ session_id, username }, SECERET_KEY, {
    expiresIn: "20d",
  });
}

export async function verify_token(token: string) {
  const SECERET_KEY = process.env.JWT_TOKEN as string;
  const decoded = await jwt.verify(token, SECERET_KEY);
  if (!decoded) {
    throw new AppError("Invalid token", 401);
  }

  const { session_id, username } = decoded as JWTPayload;
  const db = dbConnect.manager;
  const sessionRepository = new SessionRepository(db);
  const { is_active, userId, role } =
    await sessionRepository.findSessionBySessionIdAndUserName(
      session_id,
      username
    );
  if (!is_active) {
    throw new AppError("Invalid token ( session is not active )", 401);
  }
  const sessionInfo = { session_id, username, userId, role };

  return sessionInfo;
}

export const getTokenFromAuthorizationHeaderRequest = (
  req: Request
): string => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError("you need to login", 401);
  }

  const token = authorization?.replace("Bearer ", "");

  return token as string;
};
