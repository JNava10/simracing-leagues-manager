import {Request, Response} from "express";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {ChampionshipQuery} from "../services/queries/championship.query";
import {
    ChampionshipCreation,
    Championship,
    ChampionshipPreset,
    EnterChampionship,
    PresetCreation,
    GetChampProps,
    PositionCreation,
} from "../utils/interfaces/championship/championship.interface";
import {handleRequestError, sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";
import { ChampionshipPresetFull } from "../prisma/types/championship.types";
import {Messages} from "../utils/enum/messages.enum";
import {UploadedFile} from "express-fileupload";
import {XmlService} from "../services/xml.service";
import {Driver, RfactorData} from "../utils/interfaces/championship/rfactor.interface";
import {League} from "../utils/interfaces/league.interface";

export class ChampionshipController {
    get = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);

            const championship = await ChampionshipQuery.get(id);

            console.log(championship);

            return sendSuccessResponse({
                data: championship,
                msg: 'A'
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    getCalendar = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const calendar = await ChampionshipQuery.getCalendar(id);

            return sendSuccessResponse({
                data: calendar[0],
                msg: 'A'
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    getEntries = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const entries = await ChampionshipQuery.getEntries(id);

            // @ts-ignore
            console.log(entries);

            return sendSuccessResponse({
                data: entries[0],
                msg: 'A'
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    create = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as ChampionshipCreation;
            const createdChampioship = await ChampionshipQuery.create(body, req.user.id);

            return sendSuccessResponse({
                data: createdChampioship,
                msg: 'A',
                status: 201
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    enter = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as EnterChampionship;
            const champId = Number(req.params['championshipId']!);

            const createdChampioship = await ChampionshipQuery.enter(body, req.user.id, champId);

            return sendSuccessResponse({
                data: createdChampioship,
                msg: 'A',
                status: 201
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    saveResults = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as PositionCreation[];
            const champId = Number(req.params['championshipId']!);
            const round = Number(req.params['round']!);

            const roundsCreated = await ChampionshipQuery.saveRoundResults(body, round);

            if (!roundsCreated) {
                return sendSuccessResponse({
                    data: roundsCreated,
                    msg: Messages.isBanned,
                    status: 201
                }, res);
            }

            return sendSuccessResponse({
                data: roundsCreated,
                msg: Messages.createRound,
                status: 201
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    getTeams = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const presets = await ChampionshipQuery.getTeams(id);

            return sendSuccessResponse({
                data: presets,
                msg: 'A'
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    getResults = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
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
            handleRequestError(e, res);
        }
    }

    getFullData = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const data = await ChampionshipQuery.getFull(id);
            const championship: Championship = {
                id: data.id,
                name: data.name,
                description: data.description,
                calendar: data.calendar,
                simulator: data.simulator,
                teams: data.teams.map(item => item.team),
            };

            if (!data) {
                return sendErrorResponse({
                    error: 'No se han encontrado resultados del campeonato.',
                }, res);
            }

            return sendSuccessResponse({
                data: championship,
                msg: 'Se ha obtenido correctamente el campeonato.',
                status: 200
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    createPreset = async (req: CustomRequest, res: Response) => {
        try {
            const body = req.body as PresetCreation;

            const createdChampioship = await ChampionshipQuery.createPreset(body, req.user.id);

            res.status(201).send(createdChampioship);
        } catch (e) {
            handleRequestError(e, res);
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
            handleRequestError(e, res);
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
            handleRequestError(e, res);
        }
    }

    parseRfactorXml = async (req: CustomRequest, res: Response) => {
        try {
            const xmlFile = req.files['file']! as UploadedFile;
            const roundData = (XmlService.parse(xmlFile) as RfactorData);
            const driversTemp = roundData.rFactorXML.RaceResults.Race.Driver as Driver[];
            const drivers: Driver[] = [];

            driversTemp.forEach(item => {
                drivers.push({
                    Name: item.Name,
                    isPlayer: item.isPlayer,
                    GridPos: item.GridPos,
                    Position: item.Position,
                    FinishStatus: item.FinishStatus
                });
            });

            return sendSuccessResponse({
                data: drivers,
                msg: 'OK',
                status: 201
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    edit = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const presets = await ChampionshipQuery.getTeams(id);

            return sendSuccessResponse({
                data: presets,
                msg: 'A'
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }
}
