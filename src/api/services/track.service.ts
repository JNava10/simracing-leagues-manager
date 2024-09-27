import {LeagueData} from "../utils/interfaces/league.interface";
import {prisma} from "../app";

export class TrackService {
    static getAllTracks = async () => {
        try {
            return await prisma.track.findMany();
        } catch (e) {
            console.error(e.message);
        }
    };
}
