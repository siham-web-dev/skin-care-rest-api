import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"; 
import { Request } from "express";
import AppError from "./appError";
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

export  function verify_token(token: string) {
  const SECERET_KEY = process.env.JWT_TOKEN as string;
  return jwt.verify(token, SECERET_KEY, (err, decoded) => {
    if (err) {
      throw new AppError("Invalid token", 401);
    }

    const { session_id, username } = decoded as JWTPayload;

    return  { session_id, username };
  });
}



export const getTokenFromAuthorizationHeaderRequest = (req: Request) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  return token;
}


