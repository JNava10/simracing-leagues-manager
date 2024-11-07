import {Request, Response} from "express";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ChampionshipQuery} from "../services/queries/championship.query";
import {
    ChampionshipCreation,
    ChampionshipData,
    ChampionshipPreset,
    EnterChampionship,
    PresetCreation,
    GetChampProps,
    PositionCreation
} from "../utils/interfaces/championship/championship.interface";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import { ChampionshipPresetFull } from "../prisma/types/championship.types";
import {Messages} from "../utils/enum/messages.enum";
import {XMLBuilder, XMLParser} from "fast-xml-parser";
import {UploadedFile} from "express-fileupload";
import {XmlService} from "../services/xml.service";
import {Driver, RfactorData} from "../utils/interfaces/championship/rfactor.interface";

export class ChampionshipController {
    get = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);

            const championship = await ChampionshipQuery.get(id);

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

    getCalendar = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);
            const calendar = await ChampionshipQuery.getCalendar(id);

            return sendSuccessResponse({
                data: calendar[0],
                msg: 'A'
            }, res);
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    
    getEntries = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);
            const entries = await ChampionshipQuery.getEntries(id);

            // @ts-ignore
            console.log(entries)

            return sendSuccessResponse({
                data: entries[0],
                msg: 'A'
            }, res);
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    create = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as ChampionshipCreation
            const createdChampioship = await ChampionshipQuery.create(body, req.user.id);
    
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

    enter = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as EnterChampionship
            const champId = Number(req.params['id']!);

            const createdChampioship = await ChampionshipQuery.enter(body, req.user.id, champId);

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

    saveResults = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as PositionCreation[];
            const champId = Number(req.params['id']!);
            const round = Number(req.params['round']!);

            const roundsCreated = await ChampionshipQuery.saveRoundResults(body, round);

            if (!roundsCreated) {
                return sendSuccessResponse({
                    data: roundsCreated,
                    msg: Messages.ERROR_MESSAGE,
                    status: 201
                }, res);
            }

            return sendSuccessResponse({
                data: roundsCreated,
                msg: Messages.CREATE_ROUND,
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
            const presets = await ChampionshipQuery.getTeams(id);
    
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

    getResults = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);
            const results = await ChampionshipQuery.getResults(id);

            if (!results) {
                return sendErrorResponse({
                    error: 'No se han encontrado resultados del campeonato.',
                }, res);
            }

            return sendSuccessResponse({
                data: results,
                msg: 'A',
                status: 201
            }, res);
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    getFullData = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['id']!);
            const results = await ChampionshipQuery.getFull(id);

            if (!results) {
                return sendErrorResponse({
                    error: 'No se han encontrado resultados del campeonato.',
                }, res);
            }

            return sendSuccessResponse({
                data: results,
                msg: 'A',
                status: 201
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
            
            const createdChampioship = await ChampionshipQuery.createPreset(body, req.user.id);
    
            res.status(201).send(createdChampioship);
        } catch (e) {
            console.error(e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }

    getAllPresets = async (req: CustomRequest, res: Response) => {
        try {
            
            const presets = await ChampionshipQuery.getAllPresets(1);
    
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
            const preset = await ChampionshipQuery.getPresetsById(1) as ChampionshipPresetFull;
    
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

    parseRfactorXml = async (req: CustomRequest, res: Response) => {
        try {;
            const xmlFile = req.files['xml']! as UploadedFile;
            const roundData = (XmlService.parse(xmlFile) as RfactorData)
            const driversTemp = roundData.rFactorXML.RaceResults.Race.Driver as Driver[];
            const drivers: Driver[] = []

            driversTemp.forEach(item => {
                drivers.push({
                    Name: item.Name,
                    isPlayer: item.isPlayer,
                    GridPos: item.GridPos,
                    Position: item.Position,
                    FinishStatus: item.FinishStatus
                })
            })



            return sendSuccessResponse({
                data: drivers,
                msg: 'OK',
                status: 201
            }, res);
        } catch (e) {
            console.error (e)
            const error: CustomError = {error: e.message}
            res.status(500).send(error);
        }
    }
}