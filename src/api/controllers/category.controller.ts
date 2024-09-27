import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {CategoryService} from "../services/category.service";

export const getAllCategories = async (req: CustomRequest, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories(true)
        return res.status(200).send(categories);
    } catch (e) {
        const error: CustomError = {msg: e.message}
        return res.status(500).send(error);
    }
};