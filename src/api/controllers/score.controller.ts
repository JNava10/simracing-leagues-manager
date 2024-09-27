import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ScoreService} from "../services/score.service";

export const getScoreSystems = async (req: CustomRequest, res: Response) => {
    try {
        const id = Number(req.params['id']);

        if (!id) {
            const scoreSystems = await ScoreService.getAllScoreSystems()
            return res.status(200).send(scoreSystems);
        }

        // const league = await LeagueService.getLeagueById(id);

        // return res.status(200).send(league);
    } catch (e) {
        const error: CustomError = {msg: e.message}
        return res.status(500).send(error);
    }
};