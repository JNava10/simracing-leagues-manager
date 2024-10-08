import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {CategoryService} from "../services/category.service";
import { SearchCategoryProps } from '../utils/props/category.prop';
import { now, sendSuccessResponse } from "../helpers/common.helper";

export const getAll = async (req: CustomRequest, res: Response) => {
    try {
        const categories = await CategoryService.getAll(true)
        return res.status(200).send(categories);
    } catch (e) {
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
};

export const search = async (req: CustomRequest, res: Response) => {
    try {
        console.log('Debug: buscando categorias...', now()); // TODO: Borrar
        const props = req.query as SearchCategoryProps;

        const categories = await CategoryService.search(props);

        sendSuccessResponse({
            msg: "Se han encontrado categorias coincidentes.",
            status: 200,
            data: categories
        }, res);
    } catch (e) {
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
};