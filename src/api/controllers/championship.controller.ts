import {Request, Response} from "express";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ChampionshipService} from "../services/championship.service";
import {ChampionshipCreation, ChampionshipData, PresetCreation} from "../utils/interfaces/championship.interface";
import { sendSuccessResponse } from "../helpers/common.helper";

export class ChampionshipController {
    create = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as ChampionshipCreation
            
            const createdChampioship = await ChampionshipService.create(body, req.user.id);
    
            res.status(201).send(createdChampioship);
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }
    
    createPreset = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as PresetCreation;
            
            const createdChampioship = await ChampionshipService.createPreset(body, req.user.id);
    
            res.status(201).send(createdChampioship);
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    getAllPresets = async (req: CustomRequest, res: Response) => {
        try {
            
            const presets = await ChampionshipService.getAllPresets(1);
    
            return sendSuccessResponse({
                data: presets,
                msg: 'A'
            }, res);
            
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    getPresetById = async (req: CustomRequest, res: Response) => {
        try {
            const presets = await ChampionshipService.getPresetsById(1);
    
            return sendSuccessResponse({
                data: presets,
                msg: 'A'
            }, res);
            
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }
}