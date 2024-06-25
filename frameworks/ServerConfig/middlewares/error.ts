import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import logger from "../utils/logger";

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).send({ error: err.message })
    }
    logger.error(err)
    return res.status(500).send({ error: "Internal Server Error" })
}

export default ErrorHandler