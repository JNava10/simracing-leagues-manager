import {prisma} from "../app";
import {ChampionshipCreation, ChampionshipData, ChampionshipRound} from "../utils/interfaces/championship.interface";

export class ChampionshipService {
    static createChampionship = async (championship: ChampionshipCreation, authorId: number) => {
        const createdChampionship = await prisma.leagueChampionship.create({
            data: {
                name: championship.name,
                description: championship.description,
                leagueId: Number(championship.leagueId),
                authorId: authorId,
                simulatorId: championship.simulatorId
            }
        }) as ChampionshipData;            
        
        // Inserción del calendario

        for (const round of championship.calendar) {
            await prisma.championshipRound.create({
                // @ts-ignore
                data: {
                    championshipId: createdChampionship.id!,
                    name: round.name,
                    layoutId: round.layoutId
                }
            });
        }

        
        // Inserción de los equipos
        
        for (const team of championship.teams) {
            await prisma.team.create({
                // @ts-ignore
                data: {
                    name: team.name!,
                    hexColor: team.hexColor!,
                    carEntries: team.carEntries!
                }
            });
        }


        const scoreSystemCreated = await prisma.scoreSystem.create({
            // @ts-ignore
            data: {}
        });


        // Inserción de las puntuaciones de posiciones (si no existe)

        for (const position of championship.scoreSystem.positions) {
            await prisma.scoreSystemPosition.create({
                // @ts-ignore
                data: {
                    parentId: scoreSystemCreated.id,
                    score: position.score
                }
            });
        }
    };
}
