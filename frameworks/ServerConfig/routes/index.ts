import express, { NextFunction, Request, Response } from "express"
import authRouters from "./auth";
import companyRouters from "./company";
import productsRouters from "./products";
import roomsRouters from "./room";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello api version1 !");
});

router.use("/auth/", authRouters);
router.use("/company/", companyRouters);
router.use("/products/", productsRouters);
router.use("/rooms/", roomsRouters);


export default router
