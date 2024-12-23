import {League, LeagueBan, LeagueMemberQuery} from "../../utils/interfaces/league.interface";
import {prisma} from "../../app";
import {now} from '../../helpers/common.helper';
import {UserQuery} from './user.query';
import {fa, fr, tr} from "@faker-js/faker";
import {memberLeague, MemberLeaguesQuery} from "../../prisma/types/league.types";
import {ExpectedError} from "../../utils/classes/error";
import {defaults} from "../../utils/constants/default.constants";

export class LeagueQuery {
    static createLeague = async (league: League, authorId: number) => {
        const createdLeague = await prisma.league.create({
            data: {
                picUrl: league.picUrl || defaults.leagueIcon,
                bannerUrl: league.bannerUrl || defaults.leagueBanner,
                name: league.name,
                description: league.description,
                authorId: authorId,
                color: league.color,

            }
        });

        await LeagueQuery.addMember(authorId, createdLeague.id);

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
        await this.memberExists(userId, leagueId)

        const isAdded = await prisma.leagueMember.create({
            data: {leagueId, userId, accepted: false, requestedAt: now()}
        }) !== null;

        if (!isAdded) throw new Error("Error añadiendo el miembro.");

        return isAdded;
    }

    static getPendingMembers = async (leagueId: number) => {
        const pendingMembers = await prisma.leagueMember.findMany({where: {leagueId, accepted: false, requestedAt: {not: null}}, include: {user: true}});

        // @ts-ignore
        return pendingMembers.map(item => item.user);
    }

    static getChampionships = async (leagueId: number) => {
        return prisma.leagueChampionship.findMany({where: {leagueId}});
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

    static getUserLeagues = async (userId: number) => {
        const results = await prisma.leagueMember.findMany({
            where: {userId},
            include: memberLeague.include
        }) as LeagueMemberQuery[];

        return results.map(item => item.league);
    }

    static getUserLeagueIds = async (userId: number) => {
        const results = await prisma.league.findMany({where: {authorId: userId}, select: {id: true}}) as League[];

        return results.map(league => league.id)
    }

    static getLeagueMembers = async (leagueId: number) => {
        const leagueExists = await prisma.league.findFirst({where: {id: leagueId}}) !== null;

        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);

        return prisma.leagueMember.findMany({where: {leagueId, accepted: true, joinedAt: {not: null}}, include: {user: true}});
    }

    static getLeagueMember = async (leagueId: number, userId: number) => {
        const leagueExists = await prisma.league.findFirst({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findFirst({where: {id: userId}}) !== null;

        if (!userExists) throw new Error(`El usuario con ID ${leagueId} no existe.`);
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);

        return prisma.leagueMember.findFirst({where: {leagueId, accepted: true, userId: userId, joinedAt: {not: null}}, include: {user: true}});
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
                        {lastnames: {contains: search}},
                    ]
                }
            }
        );
    }

    static userAlreadyMember = async (userId: number, leagueId: number) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: leagueId}}) !== null;
        
        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`)
        if (!userExists) throw new Error(`El usuario con ID ${userId} no existe.`)

        return prisma.leagueMember.findFirst({where: {leagueId, userId}}) !== null;
    }

    static getLeaguesByName = async (search: string, userId?: number) => {
        // El ID del usuario (si es un ID existente y se ha pasado a la funcion) ayudará
        // a recoger info. adicional en las ligas, como si el usuario es miembro de la liga o no. 

        const userExists = userId && await UserQuery.userIdExists(userId)

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

        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);
        if (!userExists) throw new Error(`El usuario con ID ${userId} no existe.`);
     
        return prisma.leagueMember.delete({where: {memberKeys: {leagueId, userId}}});
    }


    static getPublicLeagues = async () => {
        return prisma.league.findMany();
    }

    static inviteMember = async (userId: number, leagueId: number) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: userId}}) !== null;

        if (!leagueExists) throw new ExpectedError(`La liga con ID ${leagueId} no existe.`);
        if (!userExists) throw new ExpectedError(`El usuario con ID ${userId} no existe.`);

        const alreadyExists = await prisma.leagueMember.findFirst({where: {userId, leagueId}});
        
        if (alreadyExists) {
            throw new ExpectedError(`El usuario ya está dentro de la liga o invitado.`);
        }

        return prisma.leagueMember.create(
            {
            data: {
                userId,
                leagueId,
                accepted: false,
                invited: true,
                invitedAt: now()
            }
        });
    }

    static getLeagueInvites = async (userId: number) => {
        return prisma.leagueMember.findMany(
            {
                where: {
                    userId,
                    invited: true,
                    accepted: false,
                    invitedAt: {not: null}
                },
                include: memberLeague.include
            });
    }

    static banMember = async ({userId, leagueId, reason}: LeagueBan) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;
        const userExists = await prisma.user.findUnique({where: {id: userId}}) !== null;

        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);
        if (!userExists) throw new Error(`El usuario con ID ${userId} no existe.`);

        const alreadyBanned = prisma.leagueBan.findFirst({where: {userId, leagueId}});

        if (!alreadyBanned) throw new Error(`Ya se habia baneado al usuario anteriormente.`);

        const banned = await prisma.leagueBan.create(
            {
                data: {
                    userId,
                    leagueId,
                    reason
                }
            });

        if (banned) {
            const deleted = await prisma.leagueMember.delete(
                {
                    where: {
                        memberKeys: {
                            leagueId,
                            userId
                        }
                    }
                });

            if (banned && deleted) {
                return true
            } else {
                throw Error("No se ha podido banear correctamente al usuario.");
            }
        }
    }

    static editLeague = async (leagueId: number, data: League) => {
        const leagueExists = await prisma.league.findUnique({where: {id: leagueId}}) !== null;

        if (!leagueExists) throw new Error(`La liga con ID ${leagueId} no existe.`);

        return prisma.league.update(
            {
                where: {id: leagueId},
                data: {
                    name: data.name,
                    description: data.description,
                }
            });
    }

    // Validators //

    static memberExists = async (userId: number, leagueId: number) => {
        const isAdded = await prisma.leagueMember.findFirst({where: {userId, leagueId}});

        if (isAdded) throw new Error("Error añadiendo el miembro.");

        return false
    }

    static isBanned = async (userId: number, leagueId: number) => {
        return await prisma.leagueBan.findFirst({where: {userId, leagueId}}) !== null
    }

    static getAllLeagues = async () => {
        return prisma.league.findMany()
    }
}
