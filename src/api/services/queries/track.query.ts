import {League} from "../../utils/interfaces/league.interface";
import {prisma} from "../../app";
import { SearchTrackProps } from "../../utils/interfaces/track.interface";

export class TrackQuery {
    getAllTracks = async () => {
        try {
            return await prisma.track.findMany();
        } catch (e) {
            console.error(e.message);
        }
    };

    static getById = (id: number) => {
        return prisma.trackLayout.findUnique({where: {id}})
    }
    
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
        console.log(name)
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
