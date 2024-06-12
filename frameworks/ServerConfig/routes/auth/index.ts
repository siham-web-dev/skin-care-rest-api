import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import UserController from "../../../../adapters/controllers/UserContoller";
import { validateInputs } from "../../middlewares/validation";
import isAuthenticated from "../../middlewares/IsAuth";
import { userLoginSchema, userRegistrationSchema } from "../../validationSchemas/UserSchema";
import IsExistedUser from "../../middlewares/IsExistedUser";
const router = express.Router();

router.post(
  "/login/",
  validateInputs(userLoginSchema), 
  passport.authenticate("local", {
    failureMessage: true,
  }), (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    res.status(200).send(req.user);
  }
);

router.post("/register", validateInputs(userRegistrationSchema), IsExistedUser,(req: Request, res: Response) => new UserController().register(req, res));

router.delete("/logout", isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) { return next(err); }
    res.status(200).send("logout !");
  });
});

export default router;
