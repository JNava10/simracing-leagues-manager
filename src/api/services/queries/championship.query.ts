import {ScoreQuery} from './score.query';
import {prisma} from "../../app";
import {
    ChampionshipCreation,
    Championship,
    ChampionshipRound,
    EnterChampionship,
    GetChampProps,
    PositionCreation,
    PresetCreation,
    Team, LeagueChampionshipQuery, ChampionshipPresetQuery, ChampionshipPreset
} from "../../utils/interfaces/championship/championship.interface";
import {TeamQuery} from "./team.query";
import {
    championshipFull,
    ChampionshipFull,
    ChampionshipPresetFull,
    presetChampionshipFull
} from "../../prisma/types/championship.types";
import {UserQuery} from "./user.query";
import {ExpectedError} from "../../utils/classes/error";
import {defaults} from "../../utils/constants/default.constants";
import {LeagueChampionship} from "@prisma/client";

export class ChampionshipQuery {
    static get = async (id: number) => {
        return prisma.leagueChampionship.findFirst({
            where: {id}
        });
    };


    static getFull = async (championshipId: number) => {
        // @ts-ignore
        const result = await prisma.leagueChampionship.findFirst({
            where: {
                id: championshipId,
            },
            include: championshipFull.include
        }) as LeagueChampionshipQuery;
        
        return {
            name: result.name,
            calendar: result.calendar,
            scoreSystem: result.scoreSystem,
            categories: result.categories.map(category => {
                return category.categories
            }),
            description: result.description,
            createdAt: result.createdAt,
            leagueId: result.leagueId,
        } as Championship;
    }

    static getTeams = async (championshipId: number) => {
        return prisma.championshipTeam.findMany({
            where: {
                championshipId,
            },

            include: {
                team: true
            }
        });
    }

    static getCalendar = async (championshipId: number) => {
        return prisma.leagueChampionship.findMany({
            where: {
                id: championshipId,
            },

            include: {
                calendar: true
            }
        });
    }

    static getEntries = async (championshipId: number) => {
        return prisma.leagueChampionship.findMany({
            where: {
                id: championshipId,
            },

            include: {
                users: {
                    include: {user: true}
                }
            }
        });
    }

    static create = async (championship: ChampionshipCreation, authorId: number) => {

        const createdScoreId = await ScoreQuery.createScoreSystem(championship.scoreSystem);

        // Insercion de los datos basicos del campeonato.
        const created = await prisma.leagueChampionship.create({
            // @ts-ignore
            data: {
                name: championship.name,
                description: championship.description,
                picUrl: championship.picUrl || defaults.leagueIcon,
                backgroundUrl: championship.backgroundUrl || defaults.leagueBanner,
                leagueId: Number(championship.leagueId),
                authorId: authorId,
                simulatorId: championship.simulatorId,
                scoreSystemId: createdScoreId
            }
        }) as LeagueChampionship;
        
        // Inserción del calendario
        await ChampionshipQuery.createCalendar(championship.calendar, created.id);
      
        const teamService = new TeamQuery();
        const createdTeams = await teamService.createTeamsReturningIds(championship.teams);

        // Inserción de la tabla foranea de los equipos y su campeonato.
        for (const i in createdTeams) {
            const teamId = createdTeams[i];

            await prisma.championshipTeam.create({data: {
                teamId,
                championshipId: created.id
            }})
        }

        // Inserción de la tabla foranea de los equipos y su campeonato.
        for (const i in championship.categoryIds) {
            const categoryId = championship.categoryIds[i];

            await prisma.championshipCategory.create({data: {
                    categoryId,
                    championshipId: created.id
                }});
        }

        return created.id;
    };

    static enter = async ({gameName, number, teamId}: EnterChampionship, userId: number, championshipId: number) => {
        const created = await prisma.championshipEntry.create({
            data: {
                gameName,
                number,
                teamId,
                userId,
                championshipId,
            }
        });
        
        return created !== null;
    };

    static isMember = async (userId: number, championshipId: number) => {
        const result = await prisma.championshipEntry.findFirst({
            where: {
                userId,
                championshipId,
            }
        });

        return result !== null;
    };


    static createPreset = async (incoming: PresetCreation, authorId: number) => {
        // Inserción de puntuaciones
        const createdScoreId = await ScoreQuery.createScoreSystem(incoming.scoreSystem)
      
        const teamService = new TeamQuery();

        const createdTeams = await teamService.createTeamsReturningIds(incoming.teams);
        
        // Insercion de los datos del preset
        const created = await prisma.championshipPreset.create({
            data: {
                name: incoming.name,
                description: incoming.description,
                authorId: authorId,
                scoreSystemId: createdScoreId,
            }
        });

        // Inserción del calendario
        await ChampionshipQuery.createPresetCalendar(incoming.calendar, created.id);
        
        // Inserción de las categorías
        for (const i in incoming.categoryIds) {
            const categoryId = incoming.categoryIds[i];

            await prisma.championshipPresetCategories.create({data: {
                categoryId,
                presetId: created.id
            }})
        }

         // Inserción de la tabla foranea de los equipos y el preset creado antes.
        for (const i in createdTeams) {
            const teamId = createdTeams[i];

            await prisma.presetTeam.create({data: {
                teamId,
                presetId: created.id
            }})
        }
    }

    static createCalendar = async (calendar: ChampionshipRound[], championshipId: number) => {
        const createdRounds: Team[] = [];

        for (const round of calendar) {
            const createdRound = await prisma.championshipRound.create({
                // @ts-ignore
                data: {
                    championshipId,
                    name: round.name,
                    layoutId: round.layoutId,
                    roundNum: createdRounds.length + 1,
                }
            });

            createdRounds.push(createdRound);
        }

        return createdRounds;
    }

    static createPresetCalendar = async (calendar: ChampionshipRound[], presetId: number) => {
        const createdRounds: ChampionshipRound[] = [];

        for (const round of calendar) {
            const createdRound = await prisma.championshipPresetLayouts.create({
                data: {
                    layoutId: round.layoutId,
                    presetId
                }
            });

            createdRounds.push(createdRound);
        }

        return createdRounds;
    }

    
    static getAllPresets = async (page: number) => {
        const pageSize = 5

        // @ts-ignore
        let results = await prisma.championshipPreset.findMany({
            take: 5,
            skip: (page - 1) * pageSize, // Se resta uno a la pagina para que tenga en cuenta la pagina en la que se está actualmente, de lo contrario en la primera pagina saltaria todos.
            include: presetChampionshipFull.include
        }) as ChampionshipPresetQuery[];

        // const presets: ChampionshipPreset[] = []
        // const teams = .map(item => item)

        // results.forEach((preset) => {
        //     presets.push({
        //         calendar: preset.layouts,
        //         teams: .map(item => item)
        //     })
        // })

        return results;
    }

    static getPresetById = async (id: number) => {
        // @ts-ignore
        let result = await prisma.championshipPreset.findFirst({
            include: presetChampionshipFull.include,
            where: {id}
        }) as ChampionshipPresetQuery;

        const preset: ChampionshipPreset = {
            id: result.id,
            teams: result.teams.map(item => item.team),
            name: result.name,
            author: result.author,
            calendar: result.layouts.map(item => item.layout),
            categories: result.categories.map(item => item.categories),
            scoreSystem: result.scoreSystem,
        }

        return preset;
    }

    static saveRoundResults = async (results: PositionCreation[], roundNum: number, championshipId: number) => {
        const round = await prisma.championshipRound.findFirst({
            where: {
                roundNum,
                championshipId,
            }
        });

        const resultsExists = await prisma.roundEntry.findFirst({
            where: {
                roundId: round.id,
            }
        }) !== null;

        if (resultsExists) {
            throw new ExpectedError('Los resultados de esta ronda ya estan introducidos.')
        }


        return prisma.roundEntry.createMany({
            // @ts-ignore
            data: results.map((result, index)=> {
                return {
                    driverId: result.driverId,
                    finishState: result.finishState,
                    roundId: round.id,
                    position: index + 1
                }
            })
        })
    }

    static getResults = async (championshipId: number) => {
        const roundIds = await prisma.championshipRound.findMany({
            where: {championshipId},
            select: {id: true}
        }) as ChampionshipRound[];

        return prisma.roundEntry.findMany({
            where: {
                roundId: {
                    in: roundIds.map(item => item.id)
                }
            },
        })
    }

    // static edit = async (championshipId: number, championship: Championship) => {
    //
    //     // Insercion de los datos basicos del campeonato.
    //     const created = await prisma.leagueChampionship.create({
    //         data: {
    //             name: championship.name,
    //             description: championship.description,
    //             leagueId: Number(championship.leagueId)!,
    //             simulatorId: championship.simulatorId,
    //         }
    //     }) as Championship;
    //
    //     // Inserción del calendario
    //     await ChampionshipQuery.createCalendar(championship.calendar, created.id);
    //
    //     const teamService = new TeamQuery();
    //     const createdTeams = await teamService.createTeamsReturningIds(championship.teams);
    //
    //     // Inserción de la tabla foranea de los equipos y su campeonato.
    //     for (const i in createdTeams) {
    //         const teamId = createdTeams[i];
    //
    //         await prisma.championshipTeam.create({data: {
    //                 teamId,
    //                 championshipId: created.id
    //             }})
    //     }
    //
    //     return created.id;
    // }

}
