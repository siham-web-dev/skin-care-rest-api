import express, { NextFunction, Request, Response } from "express";
import UserController from "../../../../adapters/controllers/UserContoller";
import { validateInputs } from "../../middlewares/validation";
import isAuthenticated from "../../middlewares/IsAuth";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../../validationSchemas/UserSchema";
import IsExistedUser from "../../middlewares/IsExistedUser";
const router = express.Router();

router.post(
  "/login/",
  validateInputs(userLoginSchema),
  (req: Request, res: Response, next: NextFunction) => new UserController().login(req, res, next)
);

router.post(
  "/register",
  validateInputs(userRegistrationSchema),
  IsExistedUser,
  (req: Request, res: Response, next: NextFunction) => new UserController().register(req, res, next)
);

router.delete(
  "/logout",
  isAuthenticated,
  (req: Request, res: Response, next: NextFunction) =>
  new UserController().logout(req, res, next)
);

export default router;
