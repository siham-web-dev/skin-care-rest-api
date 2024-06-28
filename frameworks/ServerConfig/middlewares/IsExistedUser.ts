import { NextFunction, Request, Response } from "express";
import dbConnect from "../../DBConfig";
import User from "../../DBConfig/models/UserModel";

const IsExistedUser = async (req: Request, res: Response, next: NextFunction) => {

    const { username, email, phone } = req.body;

    const user = await dbConnect
        .manager
        .findOne(User, { where: [{ username }, { email }, { phone }] });

    if (user) {
        return res.status(400).send({
            error: "User already exists",});
    }

    next();
}

export default IsExistedUser