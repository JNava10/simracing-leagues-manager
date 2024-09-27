import {prisma} from "../app";
import {ChampionshipCreation, ChampionshipData, ChampionshipRound} from "../utils/interfaces/championship.interface";

export class ChampionshipService {
    static createChampionship = async (championship: ChampionshipCreation, authorId: number) => {
        try {
            const createdChampionship = await prisma.leagueChampionship.create({
                data: {
                    name: championship.name,
                    description: championship.description,
                    authorId,
                    leagueId: Number(championship.leagueId)
                }
            }) as ChampionshipData;

            const calendar: ChampionshipRound[] = [];

            for (const trackId of championship.calendarIds) {
                const round = await prisma.championshipRound.create({
                    // @ts-ignore
                    data: {
                        championshipId: createdChampionship.id!,
                        trackId
                    }
                })

                calendar.push(round);
            }

            createdChampionship.calendar = calendar;

            return createdChampionship;
        } catch (e) {
            console.error(e.message);
        }
    };
}
