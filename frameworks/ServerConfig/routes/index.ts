import express, { NextFunction, Request, Response } from "express"
import authRouters from "./auth";
import companyRouters from "./company";
import productsRouters from "./products";

const router = express.Router();

/** 
   * @swagger
   * '/'
   * get:
   *   summary: home route
   *   description: home route
   *   responses:
   *    '200':
   *       ok
   *    '500':
   *       internal server error
   * */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello api version1 !");
});

router.use("/auth/", authRouters);
router.use("/company/", companyRouters);
router.use("/products/", productsRouters);

export default router
