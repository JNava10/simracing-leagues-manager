import {prisma} from "../../app";
import { SimulatorSearchProps } from "../../utils/props/simulator.prop";
import {tr} from "@faker-js/faker";

export class StrategyQuery {

    static getAllCars = async () => {
        return prisma.baselineCar.findMany({
            include: {
                tyres: {
                    include: {wearList: true}
                }
            }
        });
    };

    static searchCarsByName = async (name: string) => {
        return prisma.baselineCar.findMany({
            where: {name: {startsWith: name}}, // POST DEFENSA: Se ha cambiado contains por startsWith para que la busqueda sea mas concreta.
            include: {
                tyres: {
                    include: {wearList: true}
                }
            }
        });
    };

    static getCarByIdFull = async (id: number) => {
        return prisma.baselineCar.findFirst({
            where: {id},
            include: {
                tyres: {
                    include: {wearList: true}
                }
            }
        });
    };
}
