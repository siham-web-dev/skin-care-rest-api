import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { VerifyUser } from "../utils/auth";

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
}
