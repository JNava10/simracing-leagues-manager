import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Notification} from "../utils/interfaces/notification.interface";

export class UserController {
    static createUser = async (req: Request, res: Response): Promise<void> => {
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

    static getById = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            const userId = Number(req.params['id']);
            const user = await UserQuery.getById(userId) as User;

            if (!user) {
                sendSuccessResponse({
                    msg: "No se ha encontrado ningun usuario coincidente.",
                    status: 404
                }, res)

                return;
            }

            user.isYou = req.user.id === user.id;

            sendSuccessResponse(
                {
                    data: user,
                    status: 200,
                    msg: "Se ha obtenido el usuario correctamente.",
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

    static searchByNick = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = req.params['input'];
            const users = await UserQuery.searchByNick(input);

            if (users.length > 0) {
                sendSuccessResponse(
                    {
                        data: users,
                        status: 200,
                        msg: `Se han encontrado ${users.length} coincidentes.`,
                    }, res);
            } else {
                sendSuccessResponse(
                    {
                        data: [],
                        status: 404,
                        msg: `No se ha encontrado ningun usuario coincidente.`,
                    }, res);
            }
        } catch (error) {
            console.error(error);
            sendErrorResponse({
                error: `Ha ocurrido un error al buscar usuarios: ${error}`
            }, res)
        }
    }

    static getAllNotifications = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user.id;

            const notifications: Notification[] = [];


            sendSuccessResponse(
                {
                    data: notifications,
                    status: 200,
                    msg: `Se han obtenido correctamente ${notifications.length} notificaciones.`,
                }, res);
        } catch (error) {
            console.error(error);
            sendErrorResponse({
                error: `Ha ocurrido un error al buscar usuarios: ${error}`
            }, res)
        }
    }

    static getOwnData = async (req: CustomRequest, res: Response) => {
        try {
            const data = await UserQuery.getById(req.user.id);

            sendSuccessResponse(
                {
                    data: data,
                    status: 200,
                    msg: `Se ha obtenido los datos del usuario correctamente`,
                }, res);
        } catch (error) {
            console.error(error);
            sendErrorResponse({
                error: `Ha ocurrido un error al buscar usuarios: ${error}`
            }, res)
        }
    }
}
