import {ScoreQuery} from './score.query';
import {prisma} from "../../app";
import {
    ChampionshipCreation,
    ChampionshipData,
    ChampionshipRound,
    EnterChampionship,
    GetChampProps,
    PositionCreation,
    PresetCreation,
    Team
} from "../../utils/interfaces/championship/championship.interface";
import {TeamQuery} from "./team.query";
import {tr} from "@faker-js/faker";

export class ChampionshipQuery {
    static get = async (id: number, props?: GetChampProps) => {
        await prisma.leagueChampionship.findFirst({where: {id}});
    };

    static getFull = async (championshipId: number) => {
        return prisma.leagueChampionship.findMany({
            where: {
                id: championshipId,
            },

            include: {
                calendar: {
                    include: {
                        result: true
                    }
                },
            }
        });
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

    static create = async (incoming: ChampionshipCreation, authorId: number) => {

        // Insercion de los datos basicos del campeonato.
        const created = await prisma.leagueChampionship.create({
            data: {
                name: incoming.name,
                description: incoming.description,
                leagueId: Number(incoming.leagueId)!,
                authorId: authorId,
                simulatorId: incoming.simulatorId,
            }
        }) as ChampionshipData;
        
        // Inserción del calendario
        await ChampionshipQuery.createCalendar(incoming.calendar, created.id);
      
        const teamService = new TeamQuery();
        const createdTeams = await teamService.createTeamsReturningIds(incoming.teams);

        // Inserción de la tabla foranea de los equipos y su campeonato.
        for (const i in createdTeams) {
            const teamId = createdTeams[i];

            await prisma.championshipTeam.create({data: {
                teamId,
                championshipId: created.id
            }})
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
                    layoutId: round.layoutId
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
        
        return prisma.championshipPreset.findMany({
                take: 5,
                skip: (page - 1) * pageSize, // Se resta uno a la pagina para que tenga en cuenta la pagina en la que se está actualmente, de lo contrario en la primera pagina saltaria todos.
                include: {
                    categories: true, 
                    layouts: {include: {layout: true}},
                    teams: {include: {team: true}}
                }
            });
    }

    static getPresetsById = async (id: number) => {
        return prisma.championshipPreset.findFirst({
                include: {
                    author: true, 

                    scoreSystem: {
                        include: {
                            positions: true, 
                            extra: true
                        }
                    },

                    layouts: {
                        include: {
                            layout: {include: {parent: true}}
                        }
                    },

                    teams: {
                        include: {
                            team: true
                        }
                    },

                    categories: true
                },

                where: {id}
            });
    }

    static saveRoundResults = async (results: PositionCreation[], roundId: number) => {
        console.log(results)
        return prisma.roundEntry.createMany({
            // @ts-ignore
            data: results.map((result, index)=> {
                return {
                    ...result,
                    roundId,
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


}
