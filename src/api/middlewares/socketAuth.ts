import {NextFunction, Response} from "express";
import {verifyToken} from "../helpers/auth.helper";
import {AccessPayload, SocketPayload} from "../utils/interfaces/login.interface";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {TokenExpiredError} from "jsonwebtoken";
import {sendErrorResponse} from "../helpers/common.helper";
import {TokenType} from "../utils/enum/global.enum";
import {ExpectedError} from "../utils/classes/error";

export const validateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;

        if (!token) return res.status(403).json("No se ha encontrado ningun token.");

        req.user = verifyToken(token) as AccessPayload;

        if (!req.user) return res.status(403).json("Token invalido.");

        console.log(req.user);
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

export const socketAuth = (socket, next) => {
    const token = socket.handshake.headers.token;

    if (token === null) throw new Error('Unauthorized')

    const {user, type} = verifyToken(token) as SocketPayload;

    if (type !== TokenType.Socket) throw new ExpectedError('Invalid token.')
    if (!user.id) throw new ExpectedError('Unauthorized')

    socket.user = user // Metemos el token en el objeto de socket.io para poder sacar el ID despues.

    next();
};
