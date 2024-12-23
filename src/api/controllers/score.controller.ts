import {Request, Response} from "express";
import {League} from "../utils/interfaces/league.interface";
import {LeagueQuery} from "../services/queries/league.query";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ScoreQuery} from "../services/queries/score.query";
import {handleRequestError} from "../helpers/common.helper";

export const getScoreSystems = async (req: CustomRequest, res: Response) => {
    try {
        const id = Number(req.params['id']);

        if (!id) {
            const scoreSystems = await ScoreQuery.getAllScoreSystems()
            return res.status(200).send(scoreSystems);
        }

        // const league = await LeagueQuery.getLeagueById(id);

        // return res.status(200).send(league);
    } catch (e) {
        handleRequestError(e, res);
    }
};