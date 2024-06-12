import express, { NextFunction, Request, Response } from "express"
import  authRouters  from "./auth";

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello api version1 !");
});

router.use("/auth/", authRouters);

export default router
