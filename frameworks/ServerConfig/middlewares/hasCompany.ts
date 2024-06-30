import { NextFunction, Response } from "express";
import UserRepository from "../../../adapters/repositories/UserRepository";
import dbConnect from "../../DBConfig";
import AppError from "../utils/appError";

const hasCompany = async (req: any, res: Response, next: NextFunction) => {
  const { userId } = req.sessionInfo;
  const db = dbConnect.manager;
  const user: any = await new UserRepository(db).findUserById(userId);
    
  if (user.company) {
    req.sessionInfo.company = user.company;
    next();
  } else {
      next(
          new AppError(
              "Unauthorized you must have a company. Please add the information of your company first"
              , 403)
    );
  }
};
export default hasCompany;
