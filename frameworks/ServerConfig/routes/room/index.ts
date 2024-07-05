import express, { NextFunction, Request, Response } from "express";
import IsAuthenticated from "../../middlewares/IsAuth";
import { validateInputs } from "../../middlewares/validation";
import { InRoomController } from "../../controllers/instances";
import { roomSchema } from "../../validationSchemas/RoomSchema";

const router = express.Router();

router.get(
  "/",
  IsAuthenticated,
  (req: Request, res: Response, next: NextFunction) =>
    InRoomController.getAll(req, res, next)
);

router.get(
  "/:slug",
  IsAuthenticated,
  (req: Request, res: Response, next: NextFunction) =>
    InRoomController.getBySlug(req, res, next)
);

router.post(
  "/",
  IsAuthenticated,
  validateInputs(roomSchema),
  (req: Request, res: Response, next: NextFunction) =>
    InRoomController.add(req, res, next)
);

router.delete(
  "/:id",
  IsAuthenticated,
  (req: Request, res: Response, next: NextFunction) =>
    InRoomController.delete(req, res, next)
);

export default router;