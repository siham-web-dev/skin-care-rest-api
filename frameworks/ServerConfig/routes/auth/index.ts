import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
const router = express.Router();

router.post(
  "/login/",
  passport.authenticate("local", {
    failureMessage: true,
  })
);

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello api version1 !");
});

router.delete("/logout", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello api version1 !");
});

export default router;
