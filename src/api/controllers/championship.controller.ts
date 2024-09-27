import {Request, Response} from "express";
import {User} from "../utils/interfaces/user.interface";
import {UserService} from "../services/user.service";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {prisma} from "../app";
import {CustomError} from "../utils/classes/error";
import {ChampionshipService} from "../services/championship.service";
import {ChampionshipCreation, ChampionshipData} from "../utils/interfaces/championship.interface";

export const createChampionship = async (req: CustomRequest, res: Response) => {
    try {
        const body = req.body as ChampionshipCreation;
        
        const createdChampioship = await ChampionshipService.createChampionship(body, req.user.id);

        res.status(201).send(createdChampioship);
    } catch (e) {
        const error: CustomError = {msg: e.message}
        res.status(500).send(error);
    }
}