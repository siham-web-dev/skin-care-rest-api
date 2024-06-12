import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { VerifyUser } from "../utils/auth";
import dbConnect from "../../DBConfig";
import User from "../../DBConfig/models/UserModel";

export function authPassportLocalStrategy() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "usernameOrEmailOrPhoneNumber",
        passwordField: "password",
        passReqToCallback: true,
        session: true,
      },
      VerifyUser
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    dbConnect
      .getRepository(User)
      .findOne({ where: { id } })
      .then((user: any) => {
        done(null, {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
          phone: user.phone,
        });
      });
  });
}
