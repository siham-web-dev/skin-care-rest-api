import { NextFunction, Request, Response } from "express";
import { getTokenFromAuthorizationHeaderRequest, verify_token } from "../utils/auth";

const isAuthenticated = (req: any, res: Response, next: NextFunction) => {
    // get token from header
    const token = getTokenFromAuthorizationHeaderRequest(req);
    // verify token and get session info
    const sessionInfo: any = verify_token(token);
    // put session info in request
    req.sessionInfo = sessionInfo;

    next();
};

export default isAuthenticated