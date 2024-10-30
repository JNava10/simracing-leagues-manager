import {Request, Response} from "express";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ChampionshipService} from "../services/championship.service";
import {ChampionshipCreation, ChampionshipData, PresetCreation} from "../utils/interfaces/championship.interface";
import { sendSuccessResponse } from "../helpers/common.helper";
import { ChampionshipPresetFull } from "../prisma/types/championship.types";
import { ChampionshipPreset } from ".prisma/client";

export class ChampionshipController {
    get = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);

            const championship = await ChampionshipService.get(id);

            return sendSuccessResponse({
                data: championship,
                msg: 'A'
            }, res);6  
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    create = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as ChampionshipCreation
            
            const createdChampioship = await ChampionshipService.create(body, req.user.id);
    
            return sendSuccessResponse({
                data: createdChampioship,
                msg: 'A',
                status: 201
            }, res);
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    
    getTeams = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['champId']!);
            const presets = await ChampionshipService.getTeams(id);
    
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
            const preset = await ChampionshipService.getPresetsById(1) as ChampionshipPresetFull;
    
            return sendSuccessResponse({
                data: preset,
                msg: 'A'
            }, res);
            
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }
}