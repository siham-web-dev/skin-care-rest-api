import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import logger from "../utils/logger";

const ErrorHandler = (err:Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    const e = err as AppError
    const statusCode = e.statusCode?? 500
    return res.status(statusCode).send({ error: err.message })
}

export default ErrorHandler