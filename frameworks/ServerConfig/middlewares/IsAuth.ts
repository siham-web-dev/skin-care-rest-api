import { NextFunction, Request, Response } from "express";
import {
  getTokenFromAuthorizationHeaderRequest,
  verify_token,
} from "../utils/auth";

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
  try {
    // get token from header
    const token = getTokenFromAuthorizationHeaderRequest(req);
    // verify token and get session info
    const sessionInfo = await verify_token(token);
      // put session info in request
     req.sessionInfo = sessionInfo;

    next();
  } catch (error: any) {
      next(error);
  }
};

export default isAuthenticated;
