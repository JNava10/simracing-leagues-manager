import {NextFunction, Response} from "express";
import {verifyToken} from "../helpers/auth.helper";
import {AccessPayload} from "../utils/interfaces/login.interface";
import {CustomRequest} from "../utils/interfaces/express.interface";
import { TokenExpiredError } from "jsonwebtoken";
import { sendErrorResponse } from "../helpers/common.helper";

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;

        if (!token) return res.status(403).json("No se ha encontrado ningun token.");

        req.user = verifyToken(token) as AccessPayload;

        if (!req.user) return res.status(403).json("Token invalido.");
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(403).json("Token expirado.");
        } else {
            return sendErrorResponse(
                {
                    error: error, 
                    data: {}
                },  
                res
            )
        }
    }

    next()
}