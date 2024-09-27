import { kickMember } from './../controllers/league.controller';
import {LeagueData} from "../utils/interfaces/league.interface";
import {prisma} from "../app";
import { now } from '../helpers/common.helper';
import { UserService } from './user.service';
import { User } from '@prisma/client';

export class LeagueService {
    static createLeague = async (league: LeagueData, authorId: number) => {
        const createdLeague = await prisma.league.create({
            data: {
                name: league.name,
                description: league.description,
                authorId: authorId,
                category: null
            }
        });

        await LeagueService.addMember(authorId, createdLeague.id);

        return createdLeague;
    };

    static addMember = async (userId: number, leagueId: number) => {
        const memberAlreadyAdded = await prisma.leagueMember.findFirst({where: {userId, leagueId}});

        if (memberAlreadyAdded) throw new Error("El miembro ya fue añadido anteriormente");

        const isAdded = await prisma.leagueMember.create({
            data: {leagueId, userId, accepted: true, joinedAt: now()}
        }) !== null;

        if (!isAdded) throw new Error("Error añadiendo el miembro.");

        return isAdded;
    }

    
    static addPendingMember = async (userId: number, leagueId: number) => {
        await this.checkIfMemberExists(userId, leagueId)

        const isAdded = await prisma.leagueMember.create({
            data: {leagueId, userId, accepted: false, requestedAt: now()}
        }) !== null;

        if (!isAdded) throw new Error("Error añadiendo el miembro.");

        return isAdded;
    }

    static getPendingMembers = async (leagueId: number) => {
        const pendingMembers = await prisma.leagueMember.findMany({where: {leagueId, accepted: false}, include: {user: true}});        

        // @ts-ignore
        return pendingMembers.map(item => item.user);
    }

    static kickMember = async (userId: number, leagueId: number) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userIsMember = await prisma.leagueMember.findFirst({where: {leagueId, userId}})  !== null;

        if (!leagueExists) {
            throw new Error("La liga indicada no existe.");
        }

        if (!userIsMember) {
            throw new Error("User not in league.");
        }

        const isAdded = await prisma.leagueMember.delete({
            where: {
                memberKeys: {userId, leagueId}
            }
        } ) !== null;

        if (!isAdded) { 
            throw new Error("Error añadiendo el miembro.")
        }

        return isAdded;
    }

    static getLeagueById = async (leagueId: number) => {
        return prisma.league.findFirst({where: {id: leagueId}});
    }

    static getUserLeagues = (authorId: number) => {
        return prisma.league.findMany({where: {authorId}});
    }

    static getLeagueMembers = async (leagueId: number) => {
        const leagueExists = await prisma.league.findFirst({where: {id: leagueId}}) !== null;
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`)

        return prisma.leagueMember.findMany({where: {leagueId, accepted: true, joinedAt: {not: null}}, include: {user: true}});
    }

    static searchNotMembers = async (leagueId: number, search: string) => {
        const leagueExists = await prisma.league.findFirst({where: {id: leagueId}}) !== null;
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);

        // @ts-ignore
        const leagueMembers = (await prisma.leagueMember.findMany({where: {leagueId}, select: {userId: true}})).map(item => item.userId);

        return prisma.user.findMany(
            {
                where: {
                    id: {notIn: leagueMembers}, 
                    OR: [
                        {nickname: {contains: search}},
                        {name: {contains: search}},
                        {lastname: {contains: search}},
                    ]
                }
            }
        );
    }

    static userAlreadyMember = async (userId: number, leagueId: number) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: leagueId}}) !== null;
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`)
        if (!userExists) throw new Error(`El usuario con ID ${leagueId} no existe.`)

        return prisma.leagueMember.findFirst({where: {leagueId, userId}}) !== null;
    }

    static getLeaguesByName = async (search: string, userId?: number) => {
        // El ID del usuario (si es un ID existente y se ha pasado a la funcion) ayudará
        // a recoger info. adicional en las ligas, como si el usuario es miembro de la liga o no. 

        const userExists = userId && await UserService.userIdExists(userId)

        if (userExists) {
            // TODO: Devolver ligas junto a si el usuario es miembro de cada liga.
        }

        return prisma.league.findMany({where: {name: {contains: search}}});
    }

    static acceptPendingMember = async (userId: number, leagueId: number) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: userId}}) !== null;
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);
        if (!userExists) throw new Error(`El usuario con ID ${userId} no existe.`);
     
        return prisma.leagueMember.update({where: {memberKeys: {leagueId, userId}}, data: {accepted: true, joinedAt: now()}});
    }

    
    static declinePendingMember = async (userId: number, leagueId: number) => {        
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: userId}}) !== null;

        console.log(userId, userExists);
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);
        if (!userExists) throw new Error(`El usuario con ID ${userId} no existe.`);
     
        return prisma.leagueMember.delete({where: {memberKeys: {leagueId, userId}}});
    }


    static getPublicLeagues = async () => {
        return prisma.league.findMany();
    }

    // Validators //

    static checkIfMemberExists = async (userId: number, leagueId: number) => {
        const isAdded = await prisma.leagueMember.findFirst({where: {userId, leagueId}});

        if (isAdded) throw new Error("Error añadiendo el miembro.");

        return false
    }
}
