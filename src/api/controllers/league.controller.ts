import {Request, Response} from "express";
import {IsMemberAdded as IsQueryExecuted, KickMember, LeagueData, NewLeagueMember} from "../utils/interfaces/league.interface";
import {LeagueQuery} from "../services/queries/league.query";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import {isValidNumber} from "../helpers/validators.helper";
import {League} from "@prisma/client";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";

export const getLeague = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);
        if (!validId) {
            return res.send(`No se ha indicado un ID de liga válido.`);
        }

        const leagueId = Number(req.params['id']);
        const league = await LeagueQuery.getLeagueById(leagueId);

        sendSuccessResponse({
            data: league,
            msg: "Se ha obtenido la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const getOwnLeagues = async (req: CustomRequest, res: Response) => {
    try {
        const leagues = await LeagueQuery.getUserLeagues(req.user.id);

        sendSuccessResponse({
            data: leagues,
            msg: "Se han obtenido las ligas correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const createLeague = async (req: CustomRequest, res: Response) => {
    try {
        const body = req.body as LeagueData;
        const createdLeague = await LeagueQuery.createLeague(body, req.user.id);

        sendSuccessResponse({
            data: createdLeague,
            msg: "Se ha creado la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const addMemberToLeague = async (req: CustomRequest, res: Response) => {
    try {
        const {userId} = req.body as NewLeagueMember;
        const validId = isValidNumber(req.params['id']);
        if (!validId) {
            return res.send(`No se ha indicado un ID de liga válido.`);
        }

        const leagueId = Number(req.params['id']);
        const executed = await LeagueQuery.addMember(userId, leagueId);

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha añadido correctamente el miembro a la liga."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const getLeagueMembers = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);
        if (!validId) {
            return res.send(`No se ha indicado un ID de liga válido.`);
        }

        const leagueId = Number(req.params['id']);
        const leagueMembers = await LeagueQuery.getLeagueMembers(leagueId);

        sendSuccessResponse({
            data: leagueMembers,
            msg: "Se han obtenido los miembros de la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const searchNotMembers = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);
        if (!validId) {
            return res.send(`No se ha indicado un ID de liga válido.`);
        }

        const leagueId = Number(req.params['id']);
        const searchedUsers = String(req.query['search']);
        const leagueMembers = await LeagueQuery.searchNotMembers(leagueId, searchedUsers);

        sendSuccessResponse({
            data: leagueMembers,
            msg: "Se han buscado los usuarios no miembros correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const kickMember = async (req: CustomRequest, res: Response) => {
    try {
        const userId = Number(req.params['userId']);
        const leagueId = Number(req.params['leagueId']);
        const executed = await LeagueQuery.kickMember(userId, leagueId);

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha eliminado de la liga al miembro correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const searchLeagues = async (req: CustomRequest, res: Response) => {
    try {
        const nameSearched = req.query['name'] as string;
        const data = nameSearched ? await LeagueQuery.getLeaguesByName(nameSearched) : [];

        sendSuccessResponse({
            data,
            msg: "Se han buscado las ligas correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const requestToEnterLeague = async (req: CustomRequest, res: Response) => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const executed = await LeagueQuery.addPendingMember(req.user.id, leagueId);

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha enviado la petición de entrada a la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const getPendingMembers = async (req: CustomRequest, res: Response) => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const data = await LeagueQuery.getPendingMembers(leagueId);

        sendSuccessResponse({
            data,
            msg: "Se han obtenido los miembros pendientes correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const acceptMember = async (req: CustomRequest, res: Response) => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const userId = Number(req.body['userId']);
        const executed = await LeagueQuery.acceptPendingMember(userId, leagueId) !== null;

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha aceptado la entrada del usuario a la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const denyMember = async (req: CustomRequest, res: Response) => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const userId = Number(req.body['userId']);
        const executed = await LeagueQuery.declinePendingMember(userId, leagueId) !== null;

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha rechazado la entrada del usuario a la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};

export const inviteMember = async (req: CustomRequest, res: Response) => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const userId = Number(req.params['userId']);
        const executed = await LeagueQuery.inviteMember(userId, leagueId) !== null;

        sendSuccessResponse({
            data: { executed },
            msg: "Se ha enviado una invitación a la liga correctamente."
        }, res);
    } catch (e) {
        sendErrorResponse({ error: e.message }, res);
    }
};
