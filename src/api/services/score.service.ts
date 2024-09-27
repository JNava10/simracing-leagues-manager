import {LeagueData} from "../utils/interfaces/league.interface";
import {prisma} from "../app";

export class ScoreService {
    static getAllScoreSystems = async () => {
        try {
            return await prisma.scoreSystem.findMany();
        } catch (e) {
            console.error(e.message);
        }
    };
}
