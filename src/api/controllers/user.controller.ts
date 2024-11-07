import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserQuery} from "../services/queries/user.query";


export const createUser = async (req: Request, res: Response) => {
    try {
        const body = req.body as User;
        
        const createdUser = await UserQuery.createUser(body);

        res.send(createdUser);
    } catch (error) {
        console.error(error);
    }
}