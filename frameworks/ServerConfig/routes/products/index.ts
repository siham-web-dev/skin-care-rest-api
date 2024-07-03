import express, { NextFunction, Request, Response } from "express";
import { InCompanyController, InProductController } from "../../controllers/instances";
import { validateInputs } from "../../middlewares/validation";
import {
  companySchema
} from "../../validationSchemas/CompanySchema";
import IsAuthenticated from "../../middlewares/IsAuth";
import { IsAdmin } from "../../middlewares/roles";
import uploadFile from "../../middlewares/upload";
import hasCompany from "../../middlewares/hasCompany";
import { ProductSchema } from "../../validationSchemas/ProductSchema";

const router = express.Router();

router.post(
  "/",
  IsAuthenticated,
  IsAdmin,
  hasCompany,
  uploadFile("products").fields([{ name: "image", maxCount: 1 }]),
  validateInputs(ProductSchema),
  (req: Request, res: Response, next: NextFunction) =>
    InProductController.add(req, res, next)
);

router.put(
  "/:id",
  IsAuthenticated,
  IsAdmin,
  hasCompany,
  uploadFile("products").fields([{ name: "image", maxCount: 1 }]),
  validateInputs(ProductSchema),
  (req: Request, res: Response, next: NextFunction) =>
    InProductController.update(req, res, next)
);

router.delete(
  "/:id",
  IsAuthenticated,
  IsAdmin,
  hasCompany,
  (req: Request, res: Response, next: NextFunction) =>
    InProductController.delete(req, res, next)
);

export default router;