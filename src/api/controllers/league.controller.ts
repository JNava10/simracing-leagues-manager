import {Request, Response} from "express";
import {IsMemberAdded as IsQueryExecuted, KickMember, LeagueData, NewLeagueMember} from "../utils/interfaces/league.interface";
import {LeagueQuery} from "../services/queries/league.query";
import {CustomRequest} from "../utils/interfaces/express.interface";
import {CustomError} from "../utils/classes/error";
import { isValidNumber } from "../helpers/validators.helper";
import { League } from "@prisma/client";
import {sendErrorResponse, sendSuccessResponse} from "../helpers/common.helper";

export const getLeague = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);

        if (!validId) {
            return res.send(`No se ha indicado un ID de liga valido.`);
        };
        
        const leagueId = Number(req.params['id']);
        const league = await LeagueQuery.getLeagueById(leagueId);

        return res.status(200).send(league);
    } catch (e) {
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
};

export const getOwnLeagues = async (req: CustomRequest, res: Response) => {
    try {
        const leagues = await LeagueQuery.getUserLeagues(req.user.id);

        return res.status(201).send(leagues);
    } catch (e) {
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
};

export const createLeague = async (req: CustomRequest, res: Response) => {
    try {
        const body = req.body as LeagueData;
        
        const createdLeague = await LeagueQuery.createLeague(body, req.user.id);

        return res.status(201).send(createdLeague);
    } catch (e) {
        const error: CustomError = {error: e.message}

        console.error(e)

        return res.status(500).send(error);
    }
}

export const addMemberToLeague = async (req: CustomRequest, res: Response) => {
    try {
        // const userAlreadyInLeague = LeagueQuery.userAlreadyMember()

        const {userId} = req.body as NewLeagueMember;
        const validId = isValidNumber(req.params['id']);

        if (!validId) {
            return res.send(`No se ha indicado un ID de liga valido.`);
        };
        
        const leagueId = Number(req.params['id']);
        
        const executed = await LeagueQuery.addMember(userId, leagueId);

        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha añadido correctamente el miembro a la liga." 
        }

        return res.status(201).send(data);
    } catch (e) {
        console.log(e);
        
        const error: CustomError = {error: e.message}
        return res.status(500).send(error);
    }
}

export const getLeagueMembers = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);

        if (!validId) {
            return res.send(`No se ha indicado un ID de liga valido.`);
        };
        
        const leagueId = Number(req.params['id']);
        const leagueMembers = await LeagueQuery.getLeagueMembers(leagueId);

        return res.status(200).send(leagueMembers);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const searchNotMembers = async (req: CustomRequest, res: Response) => {
    try {
        const validId = isValidNumber(req.params['id']);

        if (!validId) {
            return res.send(`No se ha indicado un ID de liga valido.`);
        };
        
        const leagueId = Number(req.params['id']);
        const searchedUsers = String(req.query['search']);
        const leagueMembers = await LeagueQuery.searchNotMembers(leagueId, searchedUsers);

        return res.status(200).send(leagueMembers);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const kickMember = async (req: CustomRequest, res: Response) => {
    try {
        const userId = Number(req.params['userId']);
        const leagueId = Number(req.params['leagueId']);
        const executed = await LeagueQuery.kickMember(userId, leagueId);

        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha eliminado de la liga al miembro correctamente." 
        }

        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const searchLeagues = async (req: CustomRequest, res: Response) => {
    try {
        const nameSearched = req.query['name'] as string;

        let data: League[] = [];

        if (nameSearched) {
            data = await LeagueQuery.getLeaguesByName(nameSearched)
        }        

        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const requestToEnterLeague = async (req: CustomRequest, res: Response)  => {
    try {
        const leagueId = Number(req.params['leagueId']);        

        isValidNumber(req.params['id']);
        
        const executed = await LeagueQuery.addPendingMember(req.user.id, leagueId);

        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha enviado la petición de entrada a la liga correctamente." 
        }
        
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}


export const getPendingMembers = async (req: CustomRequest, res: Response)  => {
    try {
        const leagueId = Number(req.params['leagueId']);        

        isValidNumber(req.params['id']);
        
        const data = await LeagueQuery.getPendingMembers(leagueId);
        
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const acceptMember = async (req: CustomRequest, res: Response)  => {
    try {
        const leagueId = Number(req.params['leagueId']); 
        const userId = Number(req.body['userId']);

        isValidNumber(req.params['id']);

        const executed = await LeagueQuery.acceptPendingMember(userId, leagueId) !== null;
        
        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha aceptado la entrada del usuario a la liga correctamente." 
        }
        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const denyMember = async (req: CustomRequest, res: Response)  => {
    try {
        const leagueId = Number(req.params['leagueId']); 
        const userId = Number(req.body['userId']);

        isValidNumber(req.params['id']);
        
        const executed = await LeagueQuery.declinePendingMember(userId, leagueId) !== null;
        
        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha rechazado la entrada del usuario a la liga correctamente." 
        }

        return res.status(200).send(data);
    } catch (e) {
        console.log(e);
        
        return res.status(500).send(e.message);
    }
}

export const inviteMember = async (req: CustomRequest, res: Response)  => {
    try {
        const leagueId = Number(req.params['leagueId']);
        const userId = Number(req.params['userId']);
        
        const executed = await LeagueQuery.inviteMember(userId, leagueId) !== null;

        const data: IsQueryExecuted = {
            executed,
            msg: "Se ha aceptado la entrada del usuario a la liga correctamente."
        }

        sendSuccessResponse({
            data,
            status: 201,
            msg: "Se ha enviado una invitación a la liga correctamente."
        }, res)
    } catch (e) {
        console.log(e);

        sendErrorResponse({
            error: e.message,
        }, res)
    }
}
