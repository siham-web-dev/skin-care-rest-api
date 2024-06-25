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
};

export function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export async function generate_token({ session_id, username }: JWTPayload) {
  const SECERET_KEY = process.env.JWT_TOKEN as string;
  return await jwt.sign({ session_id, username }, SECERET_KEY, { expiresIn: "20d" });
}

export function verify_token(token: string){
  const SECERET_KEY = process.env.JWT_TOKEN as string;
  let ans = 0;
  let sessionInfo: JWTPayload = { session_id: 0, username: "" };
  jwt.verify(token, SECERET_KEY, (err, decoded) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    const { session_id, username } = decoded as JWTPayload;
    const db = dbConnect.manager;
    const sessionRepository = new SessionRepository(db);
    const isActiveSession =  sessionRepository
      .findSessionBySessionIdAndUserName(session_id, username);
    ans = 1; 
    if (!isActiveSession) {
      throw new AppError("Invalid token ( session is not active )", 401);
    }
    sessionInfo = { session_id, username };
  });
  if (ans === 1) {
    return sessionInfo;
  }
}

export const getTokenFromAuthorizationHeaderRequest = (req: Request): string => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  return token as string;
}
