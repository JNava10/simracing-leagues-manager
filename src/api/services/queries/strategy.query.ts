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

    static getCarById = async (id: number) => {
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
