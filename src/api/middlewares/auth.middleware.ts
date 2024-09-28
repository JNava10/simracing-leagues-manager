import {NextFunction, Response} from "express";
import {verifyToken} from "../helpers/auth.helper";
import {AccessPayload} from "../utils/interfaces/login.interface";
import {CustomRequest} from "../utils/interfaces/express.interface";

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.token;

    if (!token) return res.status(403).json("No token provided.");

    req.user = verifyToken(token) as AccessPayload;

    if (!req.user) return res.status(403).json("Token is not valid.");

    next()
}