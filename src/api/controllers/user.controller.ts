import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";
import {sendSuccessResponse} from "../helpers/common.helper";

export class UserController {
    static async createUser(req: Request, res: Response): Promise<void> {
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
            res.status(500).send("Error al crear el usuario.");
        }
    }
}
