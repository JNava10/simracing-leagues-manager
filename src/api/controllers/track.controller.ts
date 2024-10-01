import { Track } from './../utils/interfaces/track.interface';
import {Request, Response} from "express";
import {LeagueData} from "../utils/interfaces/league.interface";
import {LeagueService} from "../services/league.service";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {TrackService} from "../services/track.service";
import { SearchTrackProps } from "../utils/interfaces/track.interface";
import { Messages } from '../utils/enum/messages.enum';
import { sendSuccessResponse } from '../helpers/common.helper';

export const getAll = async (req: CustomRequest, res: Response) => {
    try {
        const trackId = Number(req.params['id']);

        if (!trackId) {
            const tracks = await TrackService.getAllTracks()
            return res.status(200).send(tracks);
        }

        // const league = await LeagueService.getLeagueById(track);

        // return res.status(200).send(tracks);
    } catch (e) {
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
};

export const search = async (req: Request, res: Response) => {
    try {
        const props = req.query as SearchTrackProps;
        
        const tracks = await TrackService.search(props);

        sendSuccessResponse({
            msg: Messages.SEARCH_SUCCESS,
            data: tracks,
            status: 200
        }, res)
    } catch (error) {
        console.error(error);
    }
}