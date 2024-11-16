import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Notification} from "../utils/interfaces/notification.interface";

export class EventController {
    static create = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body as User;
            const createdUser = await UserQuery.createUser(body);

            sendSuccessResponse(
                {
                    data: createdUser,
                    status: 201,
                    msg: "Usuario creado correctamente.",
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
