import {LeagueData} from "../utils/interfaces/league.interface";
import {prisma} from "../app";
import { SearchTrackProps } from "../utils/interfaces/track.interface";

export class TrackService {
    getAllTracks = async () => {
        try {
            return await prisma.track.findMany();
        } catch (e) {
            console.error(e.message);
        }
    };

    
    search = async ({name, id, country}: SearchTrackProps) => {
        return prisma.track.findMany({
            where: {
                OR: [
                    {name: {startsWith: name}},
                    {id},
                    {country}
                ]
            }});
    };

    searchLayouts = async ({name, id, country}: SearchTrackProps) => {
        return prisma.track.findMany({
            where: {
                OR: [
                    {name: {startsWith: name}},
                    {id},
                    {country}
                ]
            },

            include: {layouts: true}
        });
    };
}
