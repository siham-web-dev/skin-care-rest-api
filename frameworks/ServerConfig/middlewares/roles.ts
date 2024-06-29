import { NextFunction, Response } from "express";

export const IsAdmin = (req: any, res: Response, next: NextFunction) => {
        if (req.sessionInfo?.role === "admin") {
            next();
        } else {
            next(new Error("Unauthorized"));
        }
    };

export const IsUser = (req: any, res: Response, next: NextFunction) => {
    if (req.sessionInfo?.role === "user") {
        next();
    } else {
        next(new Error("Unauthorized"));
    }
}