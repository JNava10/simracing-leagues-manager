import { match } from 'node:assert';
import { ScoreService } from './score.service';
import { ScoreSystem } from './../utils/interfaces/score.interface';
import {prisma} from "../app";
import {ChampionshipCreation, ChampionshipData, ChampionshipPreset, ChampionshipRound, PresetCreation, Team} from "../utils/interfaces/championship.interface";
import { Layout } from "../utils/interfaces/layout.interface";
import { TeamService } from "./team.service";

export class ChampionshipService {
    static get = async (id: number) => {
        return await prisma.leagueChampionship.findFirst({where: {id}});
    };

    static create = async (incoming: ChampionshipCreation, authorId: number) => {

        // Insercion de los datos basicos del campeonato.
        const created = await prisma.leagueChampionship.create({
            data: {
                name: incoming.name,
                description: incoming.description,
                leagueId: Number(incoming.leagueId)!,
                authorId: authorId,
                simulatorId: incoming.simulatorId
            }
        }) as ChampionshipData;
        
        // Inserción del calendario
        await ChampionshipService.createCalendar(incoming.calendar, created.id);
      
        const teamService = new TeamService();
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

    static createPreset = async (incoming: PresetCreation, authorId: number) => {
        // Inserción de puntuaciones
        const createdScoreId = await ScoreService.createScoreSystem(incoming.scoreSystem)
      
        const teamService = new TeamService();
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
        await ChampionshipService.createPresetCalendar(incoming.calendar, created.id);
        
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
        
        // TODO: Enviar datos sin tener tantas anidaciones.

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
        return await prisma.championshipPreset.findFirst({
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
}
