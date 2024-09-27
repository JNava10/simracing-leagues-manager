import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserService} from "../services/user.service";


export const createUser = async (req: Request, res: Response) => {
    try {
        const body = req.body as User;
        
        const createdUser = await UserService.createUser(body);

        res.send(createdUser);
    } catch (error) {
        console.error(error);
    }
}