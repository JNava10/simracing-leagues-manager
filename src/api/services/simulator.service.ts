import {prisma} from "../app";
import { SimulatorSearchProps } from "../utils/props/simulator.prop";

export class SimulatorService {

    static search = async ({name, id, releaseYear}: SimulatorSearchProps) => {
        return prisma.simulatorGame.findMany({
            where: {
                OR: [
                    {name: {startsWith: name}},
                    {id},
                    {releaseYear}
                ]
            }});
    };
}
