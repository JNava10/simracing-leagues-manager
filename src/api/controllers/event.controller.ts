import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Notification} from "../utils/interfaces/notification.interface";
import {EventQuery} from "../services/queries/event.query";
import {LeagueEventCreation} from "../utils/interfaces/championship/championship.interface";

export class EventController {
    static create = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            const body = req.body as LeagueEventCreation;
            const authorId = req.user.id;
            const createdUser = await EventQuery.create(body, authorId);

            sendSuccessResponse(
                {
                    data: createdUser,
                    status: 201,
                    msg: "Evento de liga creado correctamente.",
                },
                res
            );
        } catch (error) {
            console.error(error);
            
            sendErrorResponse({
                error: `Ha ocurrido un error al crear el usuario: ${error}`
            }, res)
        }
    };
}
