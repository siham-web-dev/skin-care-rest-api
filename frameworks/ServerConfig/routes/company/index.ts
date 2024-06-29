import express, { NextFunction, Request, Response } from "express";
import { InCompanyController } from "../../controllers/instances";
import { validateInputs } from "../../middlewares/validation";
import {
  addCompanySchema,
  updateCompanySchema,
} from "../../validationSchemas/CompanySchema";
import IsAuthenticated from "../../middlewares/IsAuth";
import { IsAdmin } from "../../middlewares/roles";
import uploadFile from "../../middlewares/upload";

const router = express.Router();

router.post(
  "/",
  IsAuthenticated,
  IsAdmin,
  uploadFile("companies").fields([{ name: "logo", maxCount: 1 }]),
  validateInputs(addCompanySchema),
  (req: Request, res: Response, next: NextFunction) =>
    InCompanyController.add(req, res, next)
);

router.patch(
  "/:id",
  IsAuthenticated,
  IsAdmin,
  uploadFile("companies").fields([{ name: "logo", maxCount: 1 }]),
  validateInputs(updateCompanySchema),
  (req: Request, res: Response, next: NextFunction) =>
    InCompanyController.update(req, res, next)
);

export default router;
