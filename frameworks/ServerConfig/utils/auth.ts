import { Request } from "express";
import dbConnect from "../../DBConfig";
import User from "../../DBConfig/models/UserModel";
import bcrypt from 'bcryptjs'

function verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);;
}   

export function VerifyUser(
  req: Request,
  usernameOrEmailOrPhoneNumber: string,
  password: string,
  done: (error: Error | null, user?: any) => any
) {
  dbConnect
    .getRepository(User)
    .findOne({
      where: [
        { username: usernameOrEmailOrPhoneNumber },
        { email: usernameOrEmailOrPhoneNumber },
        { phone: usernameOrEmailOrPhoneNumber },
      ],
    })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      
      const isValidPassword = verifyPassword(password, user.password);
        
      if (!isValidPassword) {
        return done(null, false);
      }
        
      return done(null, user);
    });
}
