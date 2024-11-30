import { Request, Response } from "express";
import {AccessPayload, LoginData, SocketPayload} from "../utils/interfaces/login.interface";
import { UserQuery } from "../services/queries/user.query";
import { generateToken } from "../helpers/auth.helper";
import {handleRequestError, sendSuccessResponse, verifyPassword} from "../helpers/common.helper";
import { User } from "../utils/interfaces/user.interface";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {Messages} from "../utils/enum/messages.enum";
import {tr} from "@faker-js/faker";
import {TokenType} from "../utils/enum/global.enum";

export class AuthController {
    private static userService = new UserQuery();

    static async isAuth(req: CustomRequest, res: Response): Promise<void> {
        try {
            const {id} = req.user;

            if (id) {
                sendSuccessResponse({
                    msg: Messages.isAuth,
                    data: {auth: true}
                }, res)
            } else {
                sendSuccessResponse({
                    msg: Messages.notAuth,
                    data: {auth: false},
                    status: 403
                }, res)
            }

        } catch (error) {
            console.error(error);
            res.status(500).send(`Ha ocurrido un error al iniciar sesión. (${error})`);
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { nickname, email, password } = req.body as LoginData;
            let user: User;

            console.log(nickname, email, password);

            if (nickname) {
                user = await AuthController.userService.getUserByNickname(nickname);
            } else if (email) {
                user = await AuthController.userService.getUserByEmail(email);
            }

            if (!user) {
                res.status(403).send('Credenciales inválidos.');
                return;
            }

            const validPassword = await verifyPassword(password, user.password);

            if (!validPassword) {
                res.status(403).send("Credenciales inválidos.");
                return;
            }

            const apiPayload: AccessPayload = {
                nickname: user.nickname,
                email: user.email,
                id: user.id
            };

            const socketPayload: SocketPayload = {user: apiPayload, type: TokenType.Socket};


            const apiKey = await generateToken(apiPayload, "2d");
            const socketKey = await generateToken(socketPayload, "2d");

            // TODO: Generate access and refresh token.
            // const accessToken = await generateToken(payload, process.env['JWT_ACCESS_EXP_TIME']);
            // const refreshToken = await generateToken(payload, process.env['JWT_REFRESH_EXP_TIME']);

            const loginData = {
                success: true,
                apiKey,
                socketKey,
                id: user.id
            };

            res.send(loginData);
        } catch (error) {
            handleRequestError(error, res)
        }
    }
}
