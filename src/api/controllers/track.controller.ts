import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {TrackService} from "../services/track.service";

export const getAllTracks = async (req: CustomRequest, res: Response) => {
    try {
        const trackId = Number(req.params['id']);

        if (!trackId) {
            const tracks = await TrackService.getAllTracks()
            return res.status(200).send(tracks);
        }

        // const league = await LeagueService.getLeagueById(track);

        // return res.status(200).send(tracks);
    } catch (e) {
        const error: CustomError = {msg: e.message}
        return res.status(500).send(error);
    }
};