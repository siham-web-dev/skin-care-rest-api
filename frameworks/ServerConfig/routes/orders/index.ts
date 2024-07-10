import express, { NextFunction, Request, Response } from "express";
import { validateInputs } from "../../middlewares/validation";
import IsAuthenticated from "../../middlewares/IsAuth";
import { InOrderController } from "../../controllers/instances";
import { IsAdmin } from "../../middlewares/roles";

const router = express.Router();

router.post(
    "/",
    IsAuthenticated,
    (req: any, res: Response, next: NextFunction) =>
        InOrderController.createOrder(req, res, next)
);

router.patch(
    "/:id/status",
    IsAuthenticated,
    IsAdmin,
    (req: any, res: Response, next: NextFunction) =>
        InOrderController.updateStatus(req, res, next)
);

export default router