import {Request, Response} from "express";
import {AccessPayload, LoginData} from "../utils/interfaces/login.interface";
import {UserService} from "../services/user.service";
import {generateToken} from "../helpers/auth.helper";
import {verifyPassword} from "../helpers/common.helper";
import {User} from "../utils/interfaces/user.interface";

const userService = new UserService();

export const login = async (req: Request, res: Response) => {
    try {
        const {nickname, email, password} = req.body as LoginData;
        let user: User

        if (nickname) user = await userService.getUserByNickname(nickname);
        else if (email) user = await userService.getUserByEmail(email);

        if (!user) return res.status(403).send('Invalid credentials.');

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) return res.status(403).send("Invalid credentials.");

        const payload: AccessPayload = {nickname: user.nickname, email: user.email, id: user.id};

        const token = await generateToken(payload, "2d");

        // TODO: Generate access and refresh token.
        // const accessToken = await generateToken(payload, process.env['JWT_ACCESS_EXP_TIME'])
        // const refreshToken = await generateToken(payload, process.env['JWT_REFRESH_EXP_TIME']);

        const loggedData = {success: true, token};

        res.send(loggedData);
    } catch (error) {
        console.error(error);

        res.status(500).send(`Ha ocurrido un error al iniciar sesión. (${error})`);
    }
}