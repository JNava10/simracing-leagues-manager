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

            const executed = await ChampionshipQuery.enter(body, req.user.id, champId);

            return sendSuccessResponse({
                data: {executed},
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
            const round = Number(req.params['round']!);
            const champId = Number(req.params['championshipId']!);

            const roundsCreated = await ChampionshipQuery.saveRoundResults(body, round, champId);

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

            if (!results || results.length === 0) {
                return sendSuccessResponse({
                    msg: 'No se han encontrado resultados del campeonato.',
                    data: [],
                }, res);
            }

            return sendSuccessResponse({
                data: results,
                msg: 'A',
                status: 200
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    getFullData = async (req: CustomRequest, res: Response) => {
        try {
            const id = Number(req.params['championshipId']!);
            const data = await ChampionshipQuery.getFull(id);

            if (!data) {
                return sendSuccessResponse({
                    msg: 'No se han encontrado resultados del campeonato.',
                    status: 404
                }, res);
            }

            const championship: Championship = {
                id: data.id,
                name: data.name,
                description: data.description,
                categories: data.categories,
                calendar: data.calendar,
                simulator: data.simulator,
                teams: data.teams,
                scoreSystem: data.scoreSystem
            };

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

            const executed = await ChampionshipQuery.createPreset(body, req.user.id) !== null;

            return sendSuccessResponse({
                data: executed,
                msg: 'Se ha obtenido correctamente el campeonato.',
                status: 200
            }, res);
        } catch (e) {
            handleRequestError(e, res);
        }
    }

    isMember = async (req: CustomRequest, res: Response) => {
        try {

            const userId = +req.params['userId'] || req.user.id;
            const champId = +req.params['championshipId'];
            const exists = await ChampionshipQuery.isMember(userId, champId);

            return sendSuccessResponse({
                data: {exists},
                msg: 'Se ha obtenido correctamente el campeonato.',
                status: 200
            }, res);
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
            const preset = await ChampionshipQuery.getPresetById(Number(req.params['id']));

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
