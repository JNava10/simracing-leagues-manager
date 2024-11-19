import { Track } from './../utils/interfaces/track.interface';
import {Request, Response} from "express";
import {League} from "../utils/interfaces/league.interface";
import {LeagueQuery} from "../services/queries/league.query";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {TrackQuery} from "../services/queries/track.query";
import { SearchTrackProps } from "../utils/interfaces/track.interface";
import { Messages } from '../utils/enum/messages.enum';
import { sendSuccessResponse } from '../helpers/common.helper';

export class TrackController {
    private trackService = new TrackQuery();

    getAll = async (req: CustomRequest, res: Response) => {
        try {
            const trackId = Number(req.params['id']);
    
            if (!trackId) {
                const tracks = await this.trackService.getAllTracks();
                return res.status(200).send(tracks);
            }
    
            // const league = await LeagueQuery.getLeagueById(track);
    
            // return res.status(200).send(tracks);
        } catch (e) {
            const error: CustomError = {error: e.message}
            return res.status(500).send(error);
        }
    };
    
    search = async (req: Request, res: Response) => {
        try {
            const props = req.query as SearchTrackProps;
            
            const tracks = await this.trackService.search(props);
    
            sendSuccessResponse({
                msg: Messages.searchSuccess,
                data: tracks,
                status: 200
            }, res)
        } catch (error) {
            console.error(error);
        }
    }

    searchLayouts = async (req: Request, res: Response) => {
        try {
            const props = req.query as SearchTrackProps;
        
            const tracks = await this.trackService.searchLayouts(props);
    
            sendSuccessResponse({
                msg: Messages.searchSuccess,
                data: tracks,
                status: 200
            }, res)
        } catch (error) {
            console.error(error);
        }
    }
}