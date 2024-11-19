import {NextFunction, Response} from "express";
import {verifyToken} from "../helpers/auth.helper";
import {AccessPayload} from "../utils/interfaces/login.interface";
import {CustomRequest} from "../utils/interfaces/express.interface";
import { TokenExpiredError } from "jsonwebtoken";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {LeagueQuery} from "../services/queries/league.query";
import {Messages} from "../utils/enum/messages.enum";

export const isBanned = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) return res.status(403).json("Token invalido.");

        const leagueId = Number(req.params['leagueId']!);

        const isBanned = await LeagueQuery.isBanned(req.user.id, leagueId)

        if (isBanned) return sendSuccessResponse({
            data: null,
            msg: Messages.isBanned,
            status: 403
        }, res);
    } catch (error) {
        return sendErrorResponse(
            {
                data: {
                    banned: true
                },
                error: error.message,
            },
            res
        )
    }

    next()
}