import {Request, Response} from "express";
import {League} from "../utils/interfaces/league.interface";
import {LeagueQuery} from "../services/queries/league.query";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError, ExpectedError} from "../utils/classes/error";
import {CategoryQuery} from "../services/queries/category.query";
import { SearchCategoryProps } from '../utils/props/category.prop';
import {handleRequestError, now, sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";

export const getAll = async (req: CustomRequest, res: Response) => {
    try {
        const categories = await CategoryQuery.getAll()
        return res.status(200).send(categories);
    } catch (e) {
        handleRequestError(e, res)
    }
};

export const search = async (req: CustomRequest, res: Response) => {
    try {
        const props = req.query as SearchCategoryProps;

        const categories = await CategoryQuery.search(props);

        sendSuccessResponse({
            msg: "Se han encontrado categorias coincidentes.",
            status: 200,
            data: categories
        }, res);
    } catch (e) {
        handleRequestError(e, res)
    }
};