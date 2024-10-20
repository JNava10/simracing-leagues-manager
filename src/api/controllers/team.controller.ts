import { Track } from '../utils/interfaces/track.interface';
import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {TrackService} from "../services/track.service";
import { SearchTrackProps } from "../utils/interfaces/track.interface";
import { Messages } from '../utils/enum/messages.enum';
import { sendSuccessResponse } from '../helpers/common.helper';
import { TeamService } from '../services/team.service';
import { Team } from '../utils/interfaces/championship.interface';

export class TeamController {

    private teamService = new TeamService();

    /** 
     * Creación de uno o varios equipos dentro un campeonato.
     */
    create = async (req: CustomRequest, res: Response) => {
        try {
            const teams = req.body as Team[];

            if (teams.length > 1) {
                const createdTeams = await this.teamService.createTeams(teams);

                return res.status(200).send(createdTeams);
            } else {
                const createdTeam = await this.teamService.createTeam(teams[0]);

                return res.status(200).send(createdTeam);
            }
        } catch (e) {
            const error: CustomError = {error: e.message}
            return res.status(500).send(error);
        }
    };
}